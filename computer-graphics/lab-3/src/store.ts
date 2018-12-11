import createStore from 'redux-zero';

const randomColor = () => '#'+Math.floor(Math.random()*16777215).toString(16);
const randomNumber = (to: number) => Math.floor(Math.random()*to);

export interface IShape {
    key: number;
    name: string;
    x: number;
    y: number;
}

export interface IStore {
    items: IShape[];
    globals: any;
}

const createItem = (itemsCount: number, opts: any) => ({
    x: 0,
    y: 0,
    key: Date.now(),
    name: `Item №${itemsCount + 1}`,
})

export const store = createStore({
    items: [
        createItem(0, { gridSize: 50 })
    ],
    globals: {
        gridSize: 50,
    }
} as IStore);

export const itemsSelector = (state: any) => ({ items: state.items, globals: state.globals });


export const actions = (store: any) => ({
    addItem: (state: IStore) => ({
        items: Array.prototype.concat(state.items, [
            createItem(state.items.length, state.globals)
        ])
    }),
    removeItem: (state: IStore, item: any) => ({
        items: state.items.filter(el => el.key !== item.key),
    }),
    updateItem: (state: IStore, item: any, updates: any) => ({
        items: state.items.map(el => el.key === item.key ? {...item, ...updates} : el),
    }),
});