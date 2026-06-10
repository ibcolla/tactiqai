// src/app/api/var/route.ts
// VAR decision explanation endpoint — Week 3
// Takes a VAR decision + audience level → returns Granite explanation of the ruling

import { NextRequest, NextResponse } from "next/server";
import { AudienceLevel } from "@/types";
import { DEMO_VAR_DECISIONS } from "@/components/var/VARExplainer";

const AUDIENCE_VAR_SPECS: Record<AudienceLevel, string> = {
  casual: `Explain this VAR decision to someone who loves the game but doesn't know the rulebook.
- Use plain language. Avoid law numbers.
- Focus on: what the officials were looking for, why the decision feels right or controversial
- End with: one sentence a fan could use to explain it at the pub.`,

  intermediate: `Explain this VAR decision to a fan who watches regularly and understands the rules.
- Reference the relevant FIFA law and the specific criteria that were applied
- Explain the VAR intervention threshold ("clear and obvious error")
- Note what the reviewing officials would have looked for frame-by-frame`,

  expert: `Explain this VAR decision with full technical precision.
- Cite the exact FIFA law and sub-clause
- Discuss the 2024-25 law revision context where relevant
- Analyse the semi-automated offside system / 3D skeletal tracking role if applicable
- Note the second-order effects: how this call shaped the subsequent tactical and emotional arc of the match`,
};

function isConfigured(): boolean {
  return !!(process.env.WATSONX_API_KEY && process.env.WATSONX_PROJECT_ID);
}

export async function POST(req: NextRequest) {
  try {
    const body: { decisionIndex: number; audienceLevel: AudienceLevel } = await req.json();
    const { decisionIndex, audienceLevel } = body;

    if (decisionIndex === undefined || !audienceLevel) {
      return NextResponse.json({ error: "Missing decisionIndex or audienceLevel" }, { status: 400 });
    }

    const decision = DEMO_VAR_DECISIONS[decisionIndex];
    if (!decision) {
      return NextResponse.json({ error: "VAR decision not found" }, { status: 404 });
    }

    // Use pre-written expert explanations from the component as fallback / mock
    if (!isConfigured()) {
      await new Promise((r) => setTimeout(r, 700));
      return NextResponse.json({
        explanation: decision.explanation[audienceLevel],
        source: "mock",
        decisionIndex,
        audienceLevel,
      });
    }

    // Live Granite call
    const { WatsonxAI } = await import("@langchain/community/llms/watsonx_ai");
    const { ChatPromptTemplate } = await import("@langchain/core/prompts");
    const { StringOutputParser } = await import("@langchain/core/output_parsers");

    const model = new WatsonxAI({
      modelId: process.env.GRANITE_MODEL_ID || "ibm/granite-13b-chat-v2",
      ibmCloudApiKey: process.env.WATSONX_API_KEY!,
      projectId: process.env.WATSONX_PROJECT_ID!,
      modelParameters: { max_new_tokens: 600, temperature: 0.65, top_p: 0.9, repetition_penalty: 1.1 },
    });

    const systemPrompt = `You are TactiqAI's VAR explainer. Your job is to explain VAR decisions from World Cup matches with clarity, accuracy, and appropriate depth.

${AUDIENCE_VAR_SPECS[audienceLevel]}

Keep your response under 200 words. Be precise and fair — support the officials where the law is clear, acknowledge genuine controversy where it exists.`;

    const humanPrompt = `Match: {match}
Minute: {minute}'
Initial call: {initialCall}
Final outcome: {finalOutcome}
Rule applied: {rule}
Review duration: {duration} seconds

Explain this VAR decision.`;

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", systemPrompt],
      ["human", humanPrompt],
    ]);

    const chain = prompt.pipe(model).pipe(new StringOutputParser());

    const text = await chain.invoke({
      match: decision.match,
      minute: decision.minute,
      initialCall: decision.initialCall,
      finalOutcome: decision.finalOutcome,
      rule: decision.rule.title,
      duration: decision.reviewDurationSeconds,
    });

    return NextResponse.json({ explanation: text, source: "granite", decisionIndex, audienceLevel });
  } catch (error) {
    console.error("VAR explanation error:", error);
    return NextResponse.json({ error: "Failed to generate VAR explanation." }, { status: 500 });
  }
}
