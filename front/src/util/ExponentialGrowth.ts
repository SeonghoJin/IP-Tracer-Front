import { Growth } from "./Growth";

export class ExponentialGrowth implements Growth {
  initialTime: number;

  constructor(initialTime = 0) {
    this.initialTime = initialTime;
  }

  next(): number {
    this.initialTime += 1000;
    this.initialTime *= 2;
    return this.initialTime;
  }
}
