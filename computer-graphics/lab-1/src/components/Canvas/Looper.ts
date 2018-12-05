export interface IUpdateable {
    updateCanvas(): void;
}

export default class Looper {
    private static started: boolean = false;
    private static renders: any[] = [];
    
    private static loop() {
        for (let i = 0; i < Looper.renders.length; i++) {
            Looper.renders[i].updateCanvas();
        }
        // requestAnimationFrame(Looper.loop);
        console.log("LOOP");
        // (window as any).requestIdleCallback(Looper.loop);
    }

    static addToLoop(canvas: IUpdateable) {
        Looper.renders.push(canvas);
    }

    static makeLoop() {
        Looper.loop();
    }

    static start() {
        if (Looper.started) return;
        Looper.started = true;
        Looper.loop();
    }
}
