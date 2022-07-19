import * as React from "react";
import { useMemo } from "react";
import { ReactDotMap } from "@dot-map-renderer/react";
import { LineData } from "@dot-map-renderer/component/src/line/LineData";
import { Point } from "@dot-map-renderer/component/src/Point";
import { Location } from "../../types/Location";
import { useMapBackgroundColor } from "../../hooks/useMapBackgroundColor";
import { useMapGapSize } from "../../hooks/useMapGapSize";
import { useMapDotType } from "../../hooks/useMapDotType";
import { useMapPixelSize } from "../../hooks/useMapPixelSize";
import { useMapPixelColor } from "../../hooks/useMapPixelColor";
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

  const lines = useMemo(() => {
    const lines = [];

    for (let i = 0; i < locations.length - 1; i++) {
      const { latitude, longitude } = locations[i];
      const { latitude: latitude2, longitude: longitude2 } = locations[i + 1];

      lines.push([
        [latitude, longitude],
        [latitude2, longitude2],
      ] as LineData);
    }

    return lines;
  }, [locations]);

  return (
    <ReactDotMap
      anchors={anchors}
      lines={lines}
      options={{
        pixelColor,
        backgroundColor,
        pixelSize: mapPixelSize,
        gapSize: mapGapSize,
        dotType: mapDotType,
      }}
      className={style.DotMapView}
    />
  );
}

export default DotMapView;
