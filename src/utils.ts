import { MAX_STEPS, MIN_STEPS, SEG_COLORS } from "./constants";

export const getRandomColor = (): string => {
  return SEG_COLORS[Math.floor(Math.random() * SEG_COLORS.length)];
};

export const getStepsNum = () =>
  Math.floor(Math.random() * (MAX_STEPS - MIN_STEPS) + MIN_STEPS);

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
