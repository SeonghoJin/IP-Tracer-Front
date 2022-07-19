import { DotType } from "@dot-map-renderer/component/src/dot/DotType";
import { HexColor, isHexColor } from "../types/HexColor";
import { PIXEL_MIN_GAP_SIZE, PIXEL_MIN_SIZE } from "../constants";
import { verifyPixelSize } from "../util/verifyPixelSize";
import { isDotType } from "../types/isDotType";
import { verifyPixelGapSize } from "../util/verifyPixelGapSize";

export interface IStorageService {
  getBackgroundColor(): HexColor;
  setBackgroundColor(backgroundColor: HexColor): void;
  getDotColor(): HexColor;
  setDotColor(color: HexColor): void;
  getDotType(): DotType;
  setDotType(dotType: DotType): void;
  getGapSize(): number;
  setGapSize(gapSize: number): void;
  getDotSize(): number;
  setDotSize(dotSize: number): void;
}

export class LocalStorageService implements IStorageService {
  private readonly backgroundKey = "__dot_map_background__";
  private readonly dotColorKey = "__dot_color__";
  private readonly dotSizeKey = "__dot_size__";
  private readonly dotTypeKey = "__dot_type__";
  private readonly dotGapSizeKey = "__dot_gap_size__";

  constructor() {}

  public getBackgroundColor(): HexColor {
    const backgroundColor = window.localStorage.getItem(this.backgroundKey);

    if (isHexColor(backgroundColor)) {
      return backgroundColor;
    }

    const saveBackgroundColor = "#4a4f5a";
    window.localStorage.setItem(this.backgroundKey, saveBackgroundColor);

    console.warn(
      `not defined background color, so return and save initial value(${saveBackgroundColor})`
    );
    return saveBackgroundColor;
  }

  public setBackgroundColor(backgroundColor: HexColor) {
    if (!isHexColor(backgroundColor)) {
      throw new Error(`this is not hexColor type${backgroundColor}`);
    }

    window.localStorage.setItem(this.backgroundKey, backgroundColor);
  }

  public getDotColor() {
    const dotColor = window.localStorage.getItem(this.dotColorKey);

    if (isHexColor(dotColor)) {
      return dotColor;
    }

    const saveDotColor = "#000000";
    window.localStorage.setItem(this.dotColorKey, saveDotColor);

    console.warn(
      `not defined dot color, so return and save initial value(${saveDotColor})`
    );
    return saveDotColor;
  }

  public setDotColor(dotColor: HexColor) {
    if (!isHexColor(dotColor)) {
      throw new Error(`this is not hexColor type${dotColor}`);
    }

    window.localStorage.setItem(this.dotColorKey, dotColor);
  }

  public getDotSize(): number {
    const dotSize = window.localStorage.getItem(this.dotSizeKey);
    const pipedDotSize = parseInt(dotSize ?? "");

    if (verifyPixelSize(pipedDotSize)) {
      return pipedDotSize;
    }

    const saveDotSize = PIXEL_MIN_SIZE;
    window.localStorage.setItem(this.dotSizeKey, saveDotSize.toString());

    console.warn(
      `not verified dot size, so return and save initial value(${saveDotSize})`
    );
    return saveDotSize;
  }

  public setDotSize(dotSize: number) {
    if (!verifyPixelSize(dotSize)) {
      throw new Error(`this is not dot size range${dotSize}`);
    }

    window.localStorage.setItem(this.dotSizeKey, dotSize.toString());
  }

  getDotType(): DotType {
    const dotType = window.localStorage.getItem(this.dotTypeKey);

    if (isDotType(dotType)) {
      return dotType;
    }

    const saveDotType: DotType = "rectangular";
    window.localStorage.setItem(this.dotTypeKey, saveDotType);

    console.warn(
      `not verified dot type, so return and save initial value(${saveDotType})`
    );
    return saveDotType;
  }

  public setDotType(dotType: DotType) {
    if (!isDotType(dotType)) {
      throw new Error(`this is not dot type${dotType}`);
    }

    window.localStorage.setItem(this.dotTypeKey, dotType);
  }

  public getGapSize(): number {
    const gapSize = window.localStorage.getItem(this.dotGapSizeKey);
    const pipedGapSize = parseInt(gapSize ?? "");

    if (verifyPixelGapSize(pipedGapSize)) {
      return pipedGapSize;
    }

    const saveGapSize = PIXEL_MIN_GAP_SIZE;
    window.localStorage.setItem(this.dotGapSizeKey, saveGapSize.toString());

    console.warn(
      `not verified dot size, so return and save initial value(${saveGapSize})`
    );
    return saveGapSize;
  }

  public setGapSize(gapSize: number) {
    if (!verifyPixelGapSize(gapSize)) {
      throw new Error(`this is not gap size range${gapSize}`);
    }

    window.localStorage.setItem(this.dotGapSizeKey, gapSize.toString());
  }
}
