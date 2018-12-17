import createStore from 'redux-zero';

const randomColor = () => '#'+Math.floor(Math.random()*16777215).toString(16);
const randomNumber = (to: number) => Math.floor(Math.random()*to);

export interface IShape {
    key: number;
    name: string;
    type: string;
    x?: number;
    y?: number;
    angle?: number;
    apply: boolean;
}

export interface IStore {
    items: IShape[];
    globals: any;
}

const createItem = (itemsCount: number, opts: any) => ({
    ...opts,
    apply: true,
    level: 1.0,
    key: Date.now(),
    name: `№${itemsCount + 1} - ${opts.type}`,
})

export const store = createStore({
    items: [
        createItem(0, { type: 'translate', x: 0, y: 0 })
    ],
    globals: {
        gridSize: 50,
        x: 0, y: 0,
    }
} as IStore);

export const itemsSelector = (state: any) => ({ items: state.items, globals: state.globals });


export const actions = (store: any) => ({
    addTranslateItem: (state: IStore) => ({
        items: Array.prototype.concat(state.items, [
            createItem(state.items.length, {type: 'translate', x: 0, y: 0})
        ])
    }),
    addScaleItem: (state: IStore) => ({
        items: Array.prototype.concat(state.items, [
            createItem(state.items.length, {type: 'scale', x: 1, y: 1})
        ])
    }),
    addRotateItem: (state: IStore) => ({
        items: Array.prototype.concat(state.items, [
            createItem(state.items.length, {type: 'rotate', angle: 0})
        ])
    }),
    removeItem: (state: IStore, item: any) => ({
        items: state.items.filter(el => el.key !== item.key),
    }),
    updateItem: (state: IStore, item: any, updates: any) => ({
        items: state.items.map(el => el.key === item.key ? {...item, ...updates} : el),
    }),
});