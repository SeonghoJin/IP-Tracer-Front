import * as React from "react";
import { useMemo } from "react";
import { ReactDotMap } from "@dot-map-renderer/react";
import { Point } from "@dot-map-renderer/component/src/Point";
import {IComponent} from "@dot-map-renderer/component/src/IComponent";
import { Location } from "../../types/Location";
import { useMapBackgroundColor } from "../../hooks/useMapBackgroundColor";
import { useMapGapSize } from "../../hooks/useMapGapSize";
import { useMapDotType } from "../../hooks/useMapDotType";
import { useMapPixelSize } from "../../hooks/useMapPixelSize";
import { useMapPixelColor } from "../../hooks/useMapPixelColor";
import CustomPath from "../../core/CustomPath";
import style from "./DotMapView.module.scss";

type Props = {
  locations: Location[];
};

function DotMapView({ locations }: Props) {
  const { backgroundColor } = useMapBackgroundColor();
  const { mapGapSize } = useMapGapSize();
  const { mapDotType } = useMapDotType();
  const { mapPixelSize } = useMapPixelSize();
  const { pixelColor } = useMapPixelColor();

  const anchors = useMemo(() => {
    return locations.map(
      ({ latitude, longitude }) => [latitude, longitude] as Point
    );
  }, [locations]);

  const components = useMemo(() => {
    const components: IComponent[] = [];

    for (let i = 0; i < locations.length - 1; i++) {
      const { latitude, longitude } = locations[i];
      const { latitude: latitude2, longitude: longitude2 } = locations[i + 1];

      const point1: Point = [latitude, longitude];
      const point2: Point = [latitude2, longitude2];
      const customPath = new CustomPath([point1, point2]);
      components.push(customPath)
    }

    components.push(new CustomPath([[127, 30], [30, 127]]));

    return components;
  }, [locations]);

  return (
    <ReactDotMap
      anchors={anchors}
      pixelColor={pixelColor}
      backgroundColor={backgroundColor}
      gapSize={mapGapSize}
      dotType={mapDotType}
      pixelSize={mapPixelSize}
      className={style.DotMapView}
      components={components}
    />
  );
}

export default DotMapView;
