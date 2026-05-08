// @ts-nocheck
import { PROMPT_DATA, HAIRSTYLE_GROUPS } from "./promptData";
import { NEGATIVE_CHIPS, OUTPUT_SIZES } from "./extraData";

export type GenInputs = {
  action: string;
  expression: string;
  makeup: string;
  clothing: string;
  hairstyleGroup: string;
  hairstyleId: string;
  bg: string;
  enhancer: string;
  negatives?: string[]; // ids
  size?: string;        // id
};

export function getHairstylePrompt(group: string, id: string): string {
  const styles = (HAIRSTYLE_GROUPS as any)[group] || [];
  const style = styles.find((s: any) => s.id === id);
  if (!style || style.id === "keep-original") return "";
  return style.prompt;
}

export function generateMainPrompt(i: GenInputs): string {
  const parts: string[] = [
    PROMPT_DATA.editIntent,
    PROMPT_DATA.editGuard,
    "",
    PROMPT_DATA.actions[i.action],
    PROMPT_DATA.expressions[i.expression],
  ];
  if (i.clothing !== "none" && PROMPT_DATA.clothing[i.clothing]) parts.push(PROMPT_DATA.clothing[i.clothing]);
  const hair = getHairstylePrompt(i.hairstyleGroup, i.hairstyleId);
  if (hair) parts.push(`Hair/Hairstyle: ${hair}.`);
  parts.push(PROMPT_DATA.makeup[i.makeup]);
  if (i.bg !== "none" && PROMPT_DATA.backgrounds[i.bg]) parts.push(PROMPT_DATA.backgrounds[i.bg]);
  if (i.enhancer !== "none" && PROMPT_DATA.enhancers[i.enhancer]) parts.push(PROMPT_DATA.enhancers[i.enhancer]);
  // Output size
  if (i.size && i.size !== "size-none") {
    const s = OUTPUT_SIZES.find((x) => x.id === i.size);
    if (s?.text) parts.push(s.text);
  }
  parts.push("", PROMPT_DATA.framing, PROMPT_DATA.aspectGuard, PROMPT_DATA.faceLock);
  // Negative
  if (i.negatives && i.negatives.length > 0) {
    const negTexts = i.negatives
      .map((id) => NEGATIVE_CHIPS.find((c) => c.id === id)?.text)
      .filter(Boolean)
      .join(", ");
    if (negTexts) parts.push("", `Negative prompt (do NOT include): ${negTexts}.`);
  }
  return parts.join("\n");
}

export function generateShortPrompt(i: GenInputs): string {
  // Short version: action + expression + clothing + bg + size + negative only
  const parts: string[] = [];
  if (PROMPT_DATA.actions[i.action]) parts.push(PROMPT_DATA.actions[i.action]);
  if (PROMPT_DATA.expressions[i.expression]) parts.push(PROMPT_DATA.expressions[i.expression]);
  if (i.clothing !== "none" && PROMPT_DATA.clothing[i.clothing]) parts.push(PROMPT_DATA.clothing[i.clothing]);
  if (i.bg !== "none" && PROMPT_DATA.backgrounds[i.bg]) parts.push(PROMPT_DATA.backgrounds[i.bg]);
  if (i.size && i.size !== "size-none") {
    const s = OUTPUT_SIZES.find((x) => x.id === i.size);
    if (s?.text) parts.push(s.text);
  }
  parts.push("Preserve original face identity and proportions.");
  if (i.negatives && i.negatives.length > 0) {
    const negTexts = i.negatives
      .map((id) => NEGATIVE_CHIPS.find((c) => c.id === id)?.text)
      .filter(Boolean)
      .join(", ");
    if (negTexts) parts.push(`Negative: ${negTexts}.`);
  }
  return parts.join(" ");
}

export const UNIFORM_PROMPT_BASE_PRE = `Create an image of a realistic professional studio portrait edit using the provided reference photo.\nUse the provided reference image as the identity source. Preserve 100% facial identity, exact facial structure, proportions, eyes, eyebrows, nose shape, lips, jawline, skin tone, age impression, and natural expression. `;

export const UNIFORM_PROMPT_BASE_POST = ` Background: clean gradient blue studio backdrop, transitioning smoothly from deeper sky blue to lighter blue, formal official portrait look, smooth and evenly lit.\n[FRAMING: Vertical 2:3 composition, medium shot from the belt up, subject centered, straight posture, level shoulders, balanced symmetry, eye-level camera angle, and slight headroom above the head for later cropping. Keep full shoulders visible and not cut off.]\nReal photography style, natural skin texture, realistic fabric detail, sharp focus, no illustration or 3D.`;

export const UNIFORM_PLACEHOLDER = "[เลือกชุดจากด้านล่างมาเสียบตรงนี้]";

export function buildUniformPrompt(slot: string): string {
  return `${UNIFORM_PROMPT_BASE_PRE}${slot}${UNIFORM_PROMPT_BASE_POST}`;
}