
function HFractalFragment(ctx: CanvasRenderingContext2D, x: number, y: number, item: any) {
    ctx.beginPath();
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






function HalfHFractalFragment(ctx: CanvasRenderingContext2D, x: number, y: number, item: any) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, 0);
    ctx.lineTo(x, y);
    if (item.dynamicLineWidth) ctx.lineWidth = item.deep;
    ctx.stroke();
}

export function HalfHFractal(ctx: CanvasRenderingContext2D, x: number, y: number, item: any) {
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

    HalfHFractalFragment(ctx, -w2, h2, item);
    HalfHFractal(ctx, -w2, h2, childItem);

    HalfHFractalFragment(ctx, w2, h2, item);
    HalfHFractal(ctx, w2, h2, childItem);

    ctx.rotate(-item.angle);
    ctx.translate(-x, -y);
}




function TreeFractalFragment(ctx: CanvasRenderingContext2D, x: number, y: number, item: any) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    // ctx.lineTo(x, 0);
    ctx.lineTo(x, y);
    if (item.dynamicLineWidth) ctx.lineWidth = item.deep;
    ctx.stroke();
}

export function TreeFractal(ctx: CanvasRenderingContext2D, x: number, y: number, item: any) {
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

    TreeFractalFragment(ctx, -w2, h2, item);
    TreeFractal(ctx, -w2, h2, childItem);

    TreeFractalFragment(ctx, w2, h2, item);
    TreeFractal(ctx, w2, h2, childItem);

    ctx.rotate(-item.angle);
    ctx.translate(-x, -y);
}




export function Fractal(ctx: CanvasRenderingContext2D, x: number, y: number, item: any) {
    const fractals: any = {
        'hfractal': HFractal,
        'halfhfractal': HalfHFractal,
        'treefractal': TreeFractal,
    };
    const frac: any = fractals[item.fractal];
    frac(ctx, x, y, item);
}