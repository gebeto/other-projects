import * as React from 'react';
import { connect } from 'redux-zero/react';
import {
    actions,
    selectorUsers,
    selectorRoles,
    selectorAbilities,
    selectorAll,
    selectorRolesAbilities,
    selectorCalculatedAbilities,
} from './store';
import Chart from './Chart';
import Table from './Table/';


const Users = connect(selectorUsers, actions)(({ users, addUser }: any) => (
    <Table
        // title="Кандидати"
        storeKey="users"
        data={users}
        columns={[
            { accessor: 'name', title: 'Кандидати' },
        ]}
    />
));

const Roles = connect(selectorRoles, actions)(({ roles, addRole }: any) => (
    <Table
        // title="Ролі"
        storeKey="roles"
        data={roles}
        columns={[
            { accessor: 'name', title: 'Ролі' },
        ]}
    />
));

const Abilities = connect(selectorAbilities, actions)(({ abilities, addAbility }: any) => (
    <Table
        // title="Навички"
        storeKey="abilities"
        data={abilities}
        columns={[
            { accessor: 'name', title: 'Навички' },
        ]}
    />
));

const CustomRoleAbility = connect(selectorRolesAbilities, actions)(({ abilities, roles, updateItem }: any) => {
    return (
        <table className="table__table">
            <thead>
                <tr>
                    <th></th>
                    {roles.map((item: any, index: number) =>
                        <td key={index}>{item.name}</td>
                    )}
                </tr>
            </thead>
            <tbody>
                {abilities.map((item: any, index: number) => {
                    return <tr key={index}>
                        <td>{item.name}</td>
                        <td>{roles[0].abilityCoefs[index]}</td>
                        <td>{roles[1].abilityCoefs[index]}</td>
                        <td>{roles[2].abilityCoefs[index]}</td>
                        <td>{roles[3].abilityCoefs[index]}</td>
                        <td>{roles[4].abilityCoefs[index]}</td>
                        <td>{roles[5].abilityCoefs[index]}</td>
                    </tr>
                })}
            </tbody>
        </table>
    );
});

const CustomUsersRolesAbilities = connect(selectorCalculatedAbilities, actions)(({ data, roles }: any) => (
    <Table
        title="Результат"
        storeKey="abilities"
        data={data}
        columns={([] as any).concat(
            [{ accessor: 'item_0', title: ' ' }],
            roles.map((role: any, index: number) => ({
                accessor: `item_${index + 1}`, title: role.name
            }))
        )}
    />
));


const Charts = connect(selectorCalculatedAbilities, actions)(({ data, roles }: any) => {
    return (
        <div>
            {data.map((item: any, index: number) =>
                <Chart
                    key={index}
                    title={item['item_0']}
                    data={[
                        item['item_1'],
                        item['item_2'],
                        item['item_3'],
                        item['item_4'],
                        item['item_5'],
                        item['item_6'],
                    ]}
                />
            )}
        </div>
    );
});


class App extends React.Component<any, any> {
    render() {
        return (
            <div className="grid">
                <div className="col">
                    <div className="row">
                        <div className="abilities">
                            <Abilities />
                        </div>
                        <div className="roles">
                            <Roles />
                        </div>
                    </div>
                    <div className="col">
                        <CustomRoleAbility />
                        <CustomUsersRolesAbilities />
                        <Charts />
                    </div>
                </div>
            </div>
        );
    }
}


export default App;