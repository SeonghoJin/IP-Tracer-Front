import { Anchor } from '@dot-map-renderer/component';

class CustomAnchor extends Anchor {

    path: Path2D | null = null;

    draw(context: CanvasRenderingContext2D): void {
    }
}

export default CustomAnchor;
