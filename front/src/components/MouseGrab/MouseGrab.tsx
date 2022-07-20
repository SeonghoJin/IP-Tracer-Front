import React from "react";
import MousePointerIcon from "../../static/images/hand-cursor.png";

type Props = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

function MouseGrab(props: Props) {
  return <img src={MousePointerIcon} {...props} alt={"mouse-grab"} />;
}

export default MouseGrab;
