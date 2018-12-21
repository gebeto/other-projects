import createStore from 'redux-zero';


export interface IUser {
    key: number;
    name: string;
    abilityCoefs: [number, number, number, number, number, number, number, number];
}

export interface IRole {
    key: number;
    name: string;
    abilityCoefs: [number, number, number, number, number, number, number, number];
}

export interface IAbility {
    key: number;
    name: string;
    index: number;
}

export interface IStore {
    users: IUser[];
    roles: IRole[];
    abilities: IAbility[];
}


const createUser = ({ name = 'Name', abilityCoefs = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] }: any): IUser => ({
    key: Date.now(),
    name: name,
    abilityCoefs: abilityCoefs,
});

const createRole = ({ name = 'Name', abilityCoefs = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] }: any): IRole => ({
    key: Date.now(),
    name: name,
    abilityCoefs: abilityCoefs
});

const createAbility = ({ name = 'Name', index = 0 }): IAbility => ({
    key: Date.now(),
    name: name,
    index: index
});

export const store = createStore({

    users: [
        createUser({ name: 'Кандидат1', abilityCoefs: [0.5, 0.2, 0.3, 0.5, 0.9, 0.5, 0.5, 0.5] }),
        createUser({ name: 'Кандидат2', abilityCoefs: [0.5, 0.9, 0.5, 0.5, 0.2, 0.5, 0.5, 0.4] }),
        createUser({ name: 'Кандидат3', abilityCoefs: [0.6, 1.0, 0.5, 0.7, 0.4, 0.7, 0.3, 0.7] }),
        createUser({ name: 'Кандидат4', abilityCoefs: [0.4, 0.5, 1.0, 0.7, 0.8, 0.9, 0.7, 0.7] }),
        createUser({ name: 'Кандидат5', abilityCoefs: [0.5, 0.5, 0.3, 1.0, 0.5, 0.5, 0.5, 0.6] }),
        createUser({ name: 'Кандидат6', abilityCoefs: [0.9, 0.8, 0.7, 0.9, 1.0, 0.9, 0.7, 0.9] }),
        createUser({ name: 'Кандидат7', abilityCoefs: [0.6, 0.4, 0.8, 0.5, 0.6, 0.5, 0.5, 1.0] }),
        createUser({ name: 'Кандидат8', abilityCoefs: [0.6, 0.4, 0.8, 0.5, 0.6, 0.5, 0.5, 1.0] }),
        createUser({ name: 'Кандидат9', abilityCoefs: [0.6, 0.4, 0.8, 0.5, 0.6, 0.5, 0.5, 1.0] }),
    ],
    roles: [
        createRole({ name: 'Менеджер продукту', abilityCoefs: [0.9, 0.8, 0.3, 0.3, 1.0, 1.0, 0.5, 0.8] }),
        createRole({ name: 'Менеджер програми', abilityCoefs: [0.9, 0.8, 0.5, 0.9, 0.6, 1.0, 0.6, 0.9] }),
        createRole({ name: 'Розробник', abilityCoefs: [0.7, 1.0, 1.0, 0.5, 0.7, 1.0, 1.0, 0.7] }),
        createRole({ name: 'Тестер', abilityCoefs: [0.3, 0.3, 0.3, 1.0, 0.7, 0.3, 0.3, 0.3] }),
        createRole({ name: 'Інструктор', abilityCoefs: [1.0, 0.6, 0.3, 1.0, 1.0, 0.3, 0.3, 0.5] }),
        createRole({ name: 'Логістик', abilityCoefs: [0.5, 0.4, 0.8, 0.9, 0.6, 0.3, 0.3, 1.0] }),
    ],
    abilities: [
        createAbility({ index: 0, name: 'Вміння координувати роботу команди' }),
        createAbility({ index: 1, name: 'Вміння приймати компромісні рішення' }),
        createAbility({ index: 2, name: 'Прийняття рішень стосовно архітектури додатків' }),
        createAbility({ index: 3, name: 'Випробування продукту в реальних умовах' }),
        createAbility({ index: 4, name: 'Тестування зручності продукту' }),
        createAbility({ index: 5, name: 'Оцінювання термінів виконання роботи' }),
        createAbility({ index: 6, name: 'Підтримка низькорівневого проектування' }),
        createAbility({ index: 7, name: 'Складання графіків розгортання' }),
    ],
} as IStore);


export const selectorAll = (state: any) => ({ ...state });
export const selectorUsers = (state: any) => ({ users: state.users });
export const selectorUsersRoles = (state: any) => ({ users: state.users, roles: state.roles });
export const selectorUsersAbilities = (state: any) => ({ users: state.users, abilities: state.abilities });
export const selectorRoles = (state: any) => ({ roles: state.roles });
export const selectorRolesAbilities = (state: any) => ({ roles: state.roles, abilities: state.abilities });
export const selectorAbilities = (state: any) => ({ abilities: state.abilities });

const old_calculateData = (users: any, roles: any) => users.map((user: any, index: number) => {
    // const item: any = {
    //     title: user.name,
    //     data: [],
    // };
    // for (var i = 0; i < roles.length; i++) {
    //     // items[`item_${i + 1}`] = Math.max(
    //     item.data.push(Math.max(
    //         ...user.abilityCoefs.map((ab: any, ind: number) => 
    //                 Math.min(ab, roles[i].abilityCoefs[ind])
    //             )
    //         ))
    // }
    // return item;

    const items: any = {
        item_0: user.name,
    };
    for (var i = 0; i < roles.length; i++) {
        items[`item_${i + 1}`] = Math.max(
            ...user.abilityCoefs.map((ab: any, ind: number) => 
                    Math.min(ab, roles[i].abilityCoefs[ind])
                )
            );
    }
    return items;
});

const calculateData = (users: any, roles: any) =>
    users.map((user: any, index: number) =>
        roles.map((role: any) => Math.max(
            ...user.abilityCoefs.map((ab: any, ind: number) => 
                    Math.min(ab, role.abilityCoefs[ind])
                )
            )
        )
    );

const formatCalculatedData = (users: any, data: any) => users.map((user: any, index: number) => {
    const items: any = {
        item_0: user.name,
    };
    for (var i = 0; i < data.length; i++) {
        items[`item_${i + 1}`] = data[index][i]
    }
    return items;
});

export const selectorCalculatedAbilities = ({ users, roles }: any) => ({
    // data: calculateData(users, roles),
    // data: formatCalculatedData(users, calculateData(users, roles)),
    data: old_calculateData(users, roles),
    roles: roles,
});


export const actions = (store: any) => ({
    addUser: (state: IStore) => ({
        users: state.users.concat([createUser({ name: `user #${state.users.length}` })]),
    }),
    addRole: (state: IStore) => ({
        roles: state.roles.concat([createRole({})]),
    }),
    addAbility: (state: IStore) => ({
        abilities: state.abilities.concat([createAbility({ index: state.abilities.length })]),
    }),
    updateTableItem: (state: IStore, storeKey: string, item: any, index: any, key: any, value: any) => ({
        [storeKey]: (state as any)[storeKey].map((el: any) => {
            if (el === item) {
                return {
                    ...el,
                    [key]: value,
                }
            }
            return el;
        }),
    }),
    updateItem: (state: IStore, storeKey: string, item: any, key: any, value: any) => ({
        [storeKey]: (state as any)[storeKey].map((el: any) => {
            if (el === item) {
                return {
                    ...el,
                    [key]: value,
                }
            }
            return el;
        }),
    }),
    removeItem: (state: IStore, storeKey: string, item: any) => ({
        [storeKey]: (state as any)[storeKey].filter((el: any) => {
            return !(el === item);
        }),
    }),
});