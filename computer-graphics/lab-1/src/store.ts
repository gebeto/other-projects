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
}

const createItem = (itemsCount: number) => ({
    x: randomNumber(30), y: randomNumber(30),
    width: 10, height: 10,
    circleColor: randomColor(), diagonalColor: '#000',
    key: Date.now(),
    name: `Фігура #${itemsCount}`,
    shown: true,
    shown_name: true,
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