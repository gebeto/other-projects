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
}

export interface IStore {
    items: IShape[];
}

export const store = createStore({
    items: [
        {
            x: randomNumber(30), y: randomNumber(30),
            width: 10, height: 10,
            circleColor: randomColor(), diagonalColor: '#000',
            key: Date.now(),
        }
    ],
} as IStore);


export const actions = (store: any) => ({
    addItem: (state: IStore) => ({
        items: Array.prototype.concat([
            {
                x: randomNumber(30), y: randomNumber(30),
                width: 10, height: 10,
                circleColor: randomColor(), diagonalColor: '#000',
                key: Date.now()
            }
        ], state.items)
    }),
    removeItem: (state: IStore, item: any) => ({
        items: state.items.filter(el => el !== item),
    }),
    updateItem: (state: IStore, item: any, updates: any) => ({
        items: state.items.map(el => el === item ? {...item, ...updates} : el),
    }),
});