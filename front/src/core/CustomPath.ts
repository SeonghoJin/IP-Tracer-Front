import { Line } from '@dot-map-renderer/component';
import {RendererContext} from "@dot-map-renderer/canvas/src/RendererContext";

class CustomPath extends Line {

    path: Path2D | null = null;
    rate = 0;

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath();
        if(this.startDrawPoint === null){
            return;
        }
        if(this.endDrawPoint === null){
            return;
        }
        context.moveTo(
            this.startDrawPoint[0],
            this.startDrawPoint[1]
        );
        context.lineTo(
            this.endDrawPoint[0] * this.rate,
            this.endDrawPoint[1] * this.rate,
        );
        context.lineWidth = 5;
        context.strokeStyle = 'blue';
        context.stroke();
    }

    override update = (context: CanvasRenderingContext2D, rendererContext: RendererContext) => {
        this.rate = Math.min(this.rate + 0.0005, 1);
        this.draw(context);
    }

}

export default CustomPath;
