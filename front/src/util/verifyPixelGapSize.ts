import { PIXEL_MAX_GAP_SIZE, PIXEL_MIN_GAP_SIZE } from "../constants";

export const verifyPixelGapSize = (gapSize: unknown): gapSize is number => {
  if (typeof gapSize !== "number") {
    return false;
  }

  if (isNaN(gapSize)) {
    return false;
  }

  if (gapSize > PIXEL_MAX_GAP_SIZE) {
    return false;
  }

  if (gapSize < PIXEL_MIN_GAP_SIZE) {
    return false;
  }

  return true;
};
