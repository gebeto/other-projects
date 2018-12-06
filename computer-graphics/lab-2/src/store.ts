import createStore from 'redux-zero';

const randomColor = () => '#'+Math.floor(Math.random()*16777215).toString(16);
const randomNumber = (to: number) => Math.floor(Math.random()*to);

export interface IItem {
    key: number;
    deep: number;
    angle: number;
    zigZagAngle: boolean;
    width: number;
    height: number;
    stepScale: number;
    dynamicLineWidth: boolean;
    fractal: string;
}

export interface IStore {
    items: IItem[];
}

const createItem = (itemsCount: number) => ({
    key: Date.now(),
    deep: 1,
    angle: 0.0,
    zigZagAngle: false,
    width: 600,
    height: 600,
    stepScale: 0.5,
    dynamicLineWidth: true,
    fractal: 'hfractal',
})

export const store = createStore({
    items: [
        createItem(0)
    ],
} as IStore);

export const itemsSelector = (state: any) => ({ items: state.items });


export const actions = (store: any) => ({
    addItem: (state: IStore) => ({
        items: Array.prototype.concat(state.items, [
            createItem(state.items.length)
        ])
    }),
    removeItem: (state: IStore, item: any) => ({
        items: state.items.filter(el => el.key !== item.key),
    }),
    updateItem: (state: IStore, item: any, updates: any) => ({
        items: state.items.map(el => el.key === item.key ? {...item, ...updates} : el),
    }),
});