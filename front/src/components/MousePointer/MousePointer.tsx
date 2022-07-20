import React from "react";
import MousePointerIcon from "../../static/images/hand-pointer.png";

type Props = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

function MousePointer(props: Props) {
  return <img src={MousePointerIcon} {...props} alt={"mouse-pointer"} />;
}

export default MousePointer;
