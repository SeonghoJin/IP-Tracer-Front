import { RendererContext } from "@dot-map-renderer/canvas/src/RendererContext";
import { IComponent } from "@dot-map-renderer/component/src/IComponent";

class CustomAnchor extends IComponent {

    path: Path2D | null;

    draw(context: CanvasRenderingContext2D): void {

    }

    resize(renderer: RendererContext): void {

    }

}
