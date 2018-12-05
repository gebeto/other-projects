import createStore from 'redux-zero';

export interface IShape {
    x: number;
    y: number;
    width: number;
    height: number;
    key: number;
}

export interface IStore {
    items: IShape[];
}

export const store = createStore({
    items: [
        {x: 10, y: 10, width: 5, height: 3, key: Date.now() }
    ],
} as IStore);


export const actions = (store: any) => ({
    addItem: (state: IStore) => ({
        items: Array.prototype.concat([
            { x: 10, y: 10, width: 5, height: 3, key: Date.now() }
        ], state.items)
    }),
    removeItem: (state: IStore, item: any) => ({
        items: state.items.filter(el => el !== item),
    }),
    updateItem: (state: IStore, item: any, updates: any) => ({
        items: state.items.map(el => el === item ? {...item, ...updates} : el),
    }),
});