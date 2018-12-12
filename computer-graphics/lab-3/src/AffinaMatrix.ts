export type AffinaMatrix = [[number, number, number], [number, number, number], [number, number, number]];
export const affinaMult = (affina: AffinaMatrix, matrix: Array<number>): Array<number> => {
	const [i1, i2, i3] = affina;
    return [
    	i1[0] * matrix[0] + i1[1] * matrix[1] + i1[2] * matrix[2],
    	i2[0] * matrix[0] + i2[1] * matrix[1] + i2[2] * matrix[2],
    	i3[0] * matrix[0] + i3[1] * matrix[1] + i3[2] * matrix[2],
    ];
}

export const Translate = (opts: any): AffinaMatrix => ([
	[1, 0, opts.x],
	[0, 1, opts.y],
	[0, 0, 1],
]);

export const Scale = (opts: any): AffinaMatrix => ([
	[opts.x, 0, 0],
	[0, opts.y, 0],
	[0, 0, 1],
]);

export const Rotate = (opts: any): AffinaMatrix => ([
	[Math.cos(opts.angle), Math.sin(opts.angle), 0],
	[-Math.sin(opts.angle), Math.cos(opts.angle), 0],
	[0, 0, 1],
]);



export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    pipe(affina: AffinaMatrix) {
		const res = affinaMult(affina, [this.x, this.y, 1]);
		this.x = res[0];
		this.y = res[1];
		return this;
	}
}

export enum AffinaTypes {
    Translate = 'translate',
    Scale = 'scale',
    Rotate = 'rotate',
}

export const actionByType = (type: AffinaTypes) => {
	switch (type) {
		case AffinaTypes.Translate:
			return Translate;
			break;
		case AffinaTypes.Scale:
			return Scale;
			break;
		case AffinaTypes.Rotate:
			return Rotate;
			break;
	}
}