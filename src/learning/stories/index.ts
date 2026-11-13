import { aluminumOxide } from './aluminum-oxide';
import { ammoniaStep } from './ammonia-step';
import { atomSizeTrend } from './atom-size-trend';
import { atomicBasics } from './atomic-basics';
import { ballStickStep } from './ball-stick-step';
import { blastFurnaceStep } from './blast-furnace-step';
import { bromineStep } from './bromine-step';
import { cabbageIndicator } from './cabbage-indicator';
import { carbonCapture } from './carbon-capture';
import { cementStep } from './cement-step';
import { chemicalBonds } from './chemical-bonds';
import { chlorAlkaliStep } from './chlor-alkali-step';
import { chlorineStep } from './chlorine-step';
import { coalGasStep } from './coal-gas-step';
import { coldPack } from './cold-pack';
import { conductivityStep } from './conductivity-step';
import { corrosionStep } from './corrosion-step';
import { diamondGraphite } from './diamond-graphite';
import { diaperHydrogel } from './diaper-hydrogel';
import { dryIce } from './dry-ice';
import { electrolysisStep } from './electrolysis-step';
import { elementFamilies } from './element-families';
import { equilibriumStep } from './equilibrium-step';
import { fartSmell } from './fart-smell';
import { flameStep } from './flame-step';
import { fluorideTeeth } from './fluoride-teeth';
import { fuelCell } from './fuel-cell';
import { galvanicStep } from './galvanic-step';
import { gasoline } from './gasoline';
import { glowStick } from './glow-stick';
import { haberStep } from './haber-step';
import { houSodaStep } from './hou-soda-step';
import { hydrolysisStep } from './hydrolysis-step';
import { iceFloats } from './ice-floats';
import { ironStep } from './iron-step';
import { kettleScale } from './kettle-scale';
import { lithiumRockingChair } from './lithium-rocking-chair';
import { maillardBrowning } from './maillard-browning';
import { matterBasics } from './matter-basics';
import { mentosCola } from './mentos-cola';
import { metalStaircase } from './metal-staircase';
import { nitricLabStep } from './nitric-lab-step';
import { nobleGases } from './noble-gases';
import { nonstickPan } from './nonstick-pan';
import { onionTears } from './onion-tears';
import { periodicTable } from './periodic-table';
import { plasticsPolymer } from './plastics-polymer';
import { rateStep } from './rate-step';
import { roadSalt } from './road-salt';
import { selfHeatingPot } from './self-heating-pot';
import { silverTarnish } from './silver-tarnish';
import { smeltingStep } from './smelting-step';
import { sodiumStep } from './sodium-step';
import { starchGelatinization } from './starch-gelatinization';
import { sulfurStep } from './sulfur-step';
import { sulfuricStep } from './sulfuric-step';
import { surfactantCleaning } from './surfactant-cleaning';
import { titrationStep } from './titration-step';
import { tofuColloid } from './tofu-colloid';
import type { Story } from './types';
import { whyPeriodic } from './why-periodic';

export type { Story, StoryShow, StoryTurn } from './types';

/** 已经写成「小念 × 爸爸」问答的课；其余课程暂时沿用课件步骤装配的问答 */
export const stories: readonly Story[] = [
  selfHeatingPot, sodiumStep, ammoniaStep,
  periodicTable, whyPeriodic, elementFamilies, atomSizeTrend, metalStaircase, nobleGases,
  gasoline,
  fartSmell,
  flameStep,
  ironStep,
  chlorineStep,
  sulfurStep,
  nitricLabStep,
  aluminumOxide,
  rateStep,
  equilibriumStep,
  maillardBrowning,
  onionTears,
  glowStick,
  coldPack,
  matterBasics,
  atomicBasics,
  starchGelatinization,
  dryIce,
  tofuColloid,
  chemicalBonds,
  ballStickStep,
  surfactantCleaning,
  diamondGraphite,
  iceFloats,
  nonstickPan,
  conductivityStep,
  hydrolysisStep,
  titrationStep,
  cabbageIndicator,
  kettleScale,
  mentosCola,
  roadSalt,
  fluorideTeeth,
  galvanicStep,
  corrosionStep,
  electrolysisStep,
  lithiumRockingChair,
  silverTarnish,
  fuelCell,
  houSodaStep,
  chlorAlkaliStep,
  bromineStep,
  cementStep,
  blastFurnaceStep,
  smeltingStep,
  coalGasStep,
  sulfuricStep,
  haberStep,
  carbonCapture,
  diaperHydrogel,
  plasticsPolymer,
];

const bySlug = new Map(stories.map(story => [story.slug, story]));

export function findStory(slug: string): Story | undefined {
  return bySlug.get(slug);
}
