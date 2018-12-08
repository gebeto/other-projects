import createStore from 'redux-zero';

const randomColor = () => '#'+Math.floor(Math.random()*16777215).toString(16);
const randomNumber = (to: number) => Math.floor(Math.random()*to);

export interface IShape {
    x: number;
    y: number;
    width: number;
    height: number;
    circleColor: string;
    diagonalColor: string;
    key: number;
    name: any;
    shown: boolean;
    shown_name: any;
}

export interface IStore {
    items: IShape[];
    globals: any;
}

const createItem = (itemsCount: number, opts: any) => ({
    x: randomNumber(opts.gridSize), y: randomNumber(opts.gridSize),
    width: 10, height: 10,
    circleColor: randomColor(), diagonalColor: '#000',
    key: Date.now(),
    name: `Фігура #${itemsCount}`,
    shown: true,
    shown_name: true,
})

export const store = createStore({
    items: [
        createItem(0, { gridSize: 30 })
    ],
    globals: {
        gridSize: 30,
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