export class CommandIterator {
  private index = 0;
  private current = 0;
  private commands: Array<string> = [""];

  next() {
    const retIndex = this.current;
    this.current = Math.min(this.index, this.current + 1);
    return this.commands[retIndex];
  }

  previous() {
    const retIndex = this.current;
    this.current = Math.max(0, this.current - 1);
    return this.commands[retIndex];
  }

  add(command: string) {
    this.index++;
    this.commands.push(command);
  }

  moveEnd() {
    this.current = this.index;
    return this.commands[this.index];
  }
}
