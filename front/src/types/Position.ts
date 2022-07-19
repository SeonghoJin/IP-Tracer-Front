export type Position = {
  x: number;
  y: number;
};

export const isPosition = (obj: any): obj is Position => {
  if (!obj) {
    return false;
  }

  if (typeof obj !== "object") {
    return false;
  }

  if (!obj.x) {
    return false;
  }

  if (!obj.y) {
    return false;
  }

  if (typeof obj.x !== "number") {
    return false;
  }

  if (typeof obj.y !== "number") {
    return false;
  }

  return true;
};
