import { WatsonxAI } from "@langchain/community/llms/watsonx_ai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { AudienceLevel } from "@/types";

const AUDIENCE_SPECS: Record<AudienceLevel, string> = {
  casual: `You are talking to a fan who loves the atmosphere but doesn't know tactical terms.
- Use plain, vivid language and everyday analogies
- Avoid jargon unless you immediately explain it simply
- Focus on how it FELT on the pitch
- End with one sentence a fan could tell their friend`,

  intermediate: `You are talking to a fan who watches regularly and understands formations.
- Use tactical vocabulary but connect every term to a visible outcome
- Reference formations, pressing, shape, transitions
- Explain WHY a coach made the decision
- End with the key tactical trade-off the coach accepted`,

  expert: `You are talking to a tactics analyst or serious student of the game.
- Go deep: pressing triggers, positional play, compactness, combinations
- Analyze the specific spatial problem being solved
- End with a second-order effect — what this change set up later`,
};

const MOCK_RESPONSES: Record<string, Record<AudienceLevel, string>> = {
  formation_change: {
    casual: `France basically switched from playing with three midfielders to flooding the wings with faster, wider players. Think of it like a basketball team suddenly spreading out — Morocco's defenders had to choose: follow the wide runners and leave the middle empty, or hold shape and let France's attackers run free? That impossible choice is exactly what Deschamps wanted.`,
    intermediate: `Deschamps shifted from a possession-oriented 4-4-2 mid-block to a 4-3-3 high press, with Mbappé acting as the press trigger against Morocco's left center-back. The change addressed two problems: France was winning the ball too deep, and Morocco's compact shape was neutralizing central combinations. The trade-off was increased exposure on transitions.`,
    expert: `The shift to a 4-3-3 high press introduced an asymmetric pressing structure: Mbappé shadowed Morocco's left center-back, cutting off the pass to the #6, while Griezmann covered the near-side fullback. This forced Morocco into long balls over the press — precisely where France's backline held a significant aerial duel advantage. The second-order effect was Hakimi's diminished influence — pinned back defensively, his forward runs disappeared completely.`,
  },
  momentum_change: {
    casual: `The goal completely changed the energy on the pitch. Before it, Morocco looked comfortable and controlled. After it, France started pressing higher, taking more risks. Sometimes a single moment like this flips a match — players respond emotionally, shapes open up, and the team that was sitting back suddenly has to defend much harder.`,
    intermediate: `The goal triggered a reactive tactical shift from France. Trailing, Deschamps had to abandon the patient mid-block and commit more players forward, which compressed France's defensive shape and created transition spaces Morocco were targeting. The momentum shift is visible in the press intensity — France were pressing twice as aggressively in the ten minutes after the goal.`,
    expert: `Post-goal, the game entered a high-entropy phase typical of World Cup knockout matches where the trailing team overcommits. France's positional structure broke down — their #8s pushed higher, leaving the #6 isolated against Morocco's two strikers in transition. The irony is that France's overcommitment, while tactically risky, also narrowed Morocco's defensive block, creating the half-space corridors that led to the equalizer.`,
  },
  key_decision: {
    casual: `This was one of those moments where a coach makes a calculated gamble. Bringing on a fresh player mid-game isn't just about fitness — it's a message to the opposition. The new player brings different movement patterns that the other team hasn't had 60 minutes to read. It's like changing the lock on a door the opponent has almost figured out how to pick.`,
    intermediate: `The substitution served a dual purpose: fresh legs in a position Morocco had identified as a weak link, and a tactical signal. The player coming on carried a different movement profile — wider runs, more direct dribbling — which forced Morocco to recalibrate their defensive assignments.`,
    expert: `The substitution resolved a positional mismatch that had persisted for 40 minutes. The player replaced had been systematically pressed into back-passes by Morocco's shadow coverage. The replacement's tendency to receive on the half-turn and play forward immediately disrupted Morocco's press timing, creating the vertical pass lanes that had been absent.`,
  },
};

function getMockResponse(momentType: string, audienceLevel: AudienceLevel): string {
  return MOCK_RESPONSES[momentType]?.[audienceLevel] ?? MOCK_RESPONSES.key_decision[audienceLevel];
}

export function isConfigured(): boolean {
  return !!(process.env.WATSONX_API_KEY && process.env.WATSONX_PROJECT_ID);
}

export function createGraniteClient() {
  return new WatsonxAI({
    modelId: "ibm/granite-3-8b-instruct",
    ibmCloudApiKey: process.env.WATSONX_API_KEY!,
    projectId: process.env.WATSONX_PROJECT_ID!,
    modelParameters: {
      max_new_tokens: 800,
      temperature: 0.7,
      top_p: 0.9,
      repetition_penalty: 1.1,
    },
  });
}

export async function explainTacticalMoment(input: {
  matchContext: string;
  moment: string;
  formationBefore?: string;
  formationAfter?: string;
  audienceLevel: AudienceLevel;
  momentType?: "formation_change" | "momentum_change" | "key_decision";
}): Promise<{ text: string; source: "granite" | "mock" }> {
  if (!isConfigured()) {
    await new Promise((r) => setTimeout(r, 900));
    return { text: getMockResponse(input.momentType ?? "key_decision", input.audienceLevel), source: "mock" };
  }

  try {
    const model = createGraniteClient();
    const parser = new StringOutputParser();

    const systemPrompt = `You are TactiqAI — an expert soccer tactical analyst.
Explain this World Cup tactical moment clearly and specifically.

${AUDIENCE_SPECS[input.audienceLevel]}

Structure your response exactly like this:
**WHAT CHANGED**
[1-2 sentences]

**WHY IT WAS DONE**
[2-3 sentences]

**THE IMPACT**
[2-3 sentences]

**THE INSIGHT**
[1 memorable sentence]

Under 220 words total.`;

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", systemPrompt],
      ["human", "Match: {matchContext}\n\nMoment: {moment}\nFormation before: {formationBefore}\nFormation after: {formationAfter}\n\nExplain this tactical moment."],
    ]);

    const chain = prompt.pipe(model).pipe(parser);
    const text = await chain.invoke({
      matchContext: input.matchContext,
      moment: input.moment,
      formationBefore: input.formationBefore ?? "unknown",
      formationAfter: input.formationAfter ?? "unknown",
    });

    return { text, source: "granite" };
  } catch (error) {
    console.error("Granite error:", error);
    return { text: getMockResponse(input.momentType ?? "key_decision", input.audienceLevel), source: "mock" };
  }
}

export async function analyzeMomentumShift(input: {
  matchContext: string;
  eventSequence: string[];
  audienceLevel: AudienceLevel;
}): Promise<{ text: string; source: "granite" | "mock" }> {
  if (!isConfigured()) {
    await new Promise((r) => setTimeout(r, 900));
    return { text: getMockResponse("momentum_change", input.audienceLevel), source: "mock" };
  }

  try {
    const model = createGraniteClient();
    const parser = new StringOutputParser();

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", `You are TactiqAI. Analyze a momentum shift in a World Cup match.\n${AUDIENCE_SPECS[input.audienceLevel]}\nUnder 180 words.`],
      ["human", "Match: {matchContext}\n\nEvents:\n{events}\n\nAnalyze the momentum shift."],
    ]);

    const chain = prompt.pipe(model).pipe(parser);
    const text = await chain.invoke({
      matchContext: input.matchContext,
      events: input.eventSequence.map((e, i) => `${i + 1}. ${e}`).join("\n"),
    });

    return { text, source: "granite" };
  } catch (error) {
    console.error("Granite error:", error);
    return { text: getMockResponse("momentum_change", input.audienceLevel), source: "mock" };
  }
}
