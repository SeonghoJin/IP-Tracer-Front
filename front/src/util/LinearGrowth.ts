import { Growth } from "./Growth";

export class LinearGrowth implements Growth {
  initialTime: number;

  constructor(initialTime = 0) {
    this.initialTime = initialTime;
  }

  next(): number {
    this.initialTime += 1000;
    return this.initialTime;
  }
}
