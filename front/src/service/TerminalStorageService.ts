import { isPosition, Position } from "../types/Position";
import { jsonToObject } from "../util/jsonToObject";

export interface ITerminalStorageService {
  setOptionTerminalPosition(position: Position): void;
  getOptionTerminalPosition(): Position;
}

export class TerminalStorageService implements ITerminalStorageService {
  private readonly optionTerminalPositionKey =
    "__option_terminal_position_key__";

  getOptionTerminalPosition(): Position {
    const position = window.localStorage.getItem(
      this.optionTerminalPositionKey
    );
    const { result } = jsonToObject(position ?? "");

    if (isPosition(result)) {
      return result;
    }

    const savePosition: Position = {
      x: 0,
      y: 0,
    };
    window.localStorage.setItem(
      this.optionTerminalPositionKey,
      JSON.stringify(savePosition)
    );
    console.warn(
      `this is not position type, so return and save initial value(${position})`
    );
    return savePosition;
  }

  setOptionTerminalPosition(position: Position): void {
    if (!isPosition(position)) {
      throw new Error("this is not position type");
    }

    window.localStorage.setItem(
      this.optionTerminalPositionKey,
      JSON.stringify(position)
    );
  }
}
