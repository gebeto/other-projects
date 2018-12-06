export interface IUpdateable {
    updateCanvas(): void;
}

export default class Looper {
    private static started: boolean = false;
    private static renders: any[] = [];

    private static animate() {
        Looper.started = true;
        Looper.refresh();
        requestAnimationFrame(Looper.animate);
    }
    
    private static refresh() {
        for (let i = 0; i < Looper.renders.length; i++) {
            Looper.renders[i].updateCanvas();
        }
        console.log("LOOP");
    }

    static addToLoop(canvas: IUpdateable) {
        Looper.renders.push(canvas);
    }

    static makeLoop() {
        if (this.started) return;
        Looper.refresh();
    }

    static start() {
        if (Looper.started) return;
        Looper.started = true;
        Looper.animate();
    }
}
