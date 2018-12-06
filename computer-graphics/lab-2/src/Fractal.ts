
function HFractalFragment(ctx: CanvasRenderingContext2D, x: number, y: number, item: any) {
    ctx.beginPath();
    // x = Math.sin((window as any).TIME) * x;
    ctx.moveTo(0, 0);
    ctx.lineTo(x, 0);
    ctx.lineTo(x, y);
    if (item.dynamicLineWidth) ctx.lineWidth = item.deep;
    ctx.stroke();
}

export function HFractal(ctx: CanvasRenderingContext2D, x: number, y: number, item: any) {
    if (item.deep <= 0) return;
    const childItem = {
        ...item,
        height: item.height * item.stepScale,
        width: item.width * item.stepScale,
        deep: item.deep - 1,
        angle: item.angle * (item.zigZagAngle ? -1 : 1),
    };

    const w = item.width;
    const w2 = w / 2;
    const h = item.height;
    const h2 = h / 2;


    ctx.translate(x, y);
    ctx.rotate(item.angle);
    
    HFractalFragment(ctx, -w2, -h2, item);
    HFractal(ctx, -w2, -h2, childItem);
    
    HFractalFragment(ctx, -w2, h2, item);
    HFractal(ctx, -w2, h2, childItem);
    
    HFractalFragment(ctx, w2, -h2, item);
    HFractal(ctx, w2, -h2, childItem);
    
    HFractalFragment(ctx, w2, h2, item);
    HFractal(ctx, w2, h2, childItem);
    
    ctx.rotate(-item.angle);
    ctx.translate(-x, -y);
}