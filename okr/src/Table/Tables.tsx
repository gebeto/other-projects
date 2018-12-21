import * as React from 'react';
import { connect } from 'redux-zero/react';
import {
    actions,
    selectorUsers,
    selectorRoles,
    selectorAbilities,
    selectorAll,
    selectorRolesAbilities,
    selectorUsersAbilities,
    selectorCalculatedAbilities,
} from '../store';
import Chart from '../Chart';
import Table, { ScrollableTable } from './';
import EditableInput from '../EditableInput';


export const Users = connect(selectorUsers, actions)(({ users, addUser }: any) => (
    <Table
        editable
        addable="User"
        storeKey="users"
        data={users}
        columns={[
            { accessor: 'name', title: 'Кандидати' },
        ]}
    />
));

export const Roles = connect(selectorRoles, actions)(({ roles, addRole }: any) => (
    <Table
        editable
        addable="Role"
        storeKey="roles"
        data={roles}
        columns={[
            { accessor: 'name', title: 'Ролі' },
        ]}
    />
));

export const Abilities = connect(selectorAbilities, actions)(({ abilities, addAbility }: any) => (
    <Table
        editable
        addable="Ability"
        storeKey="abilities"
        data={abilities}
        columns={[
            { accessor: 'name', title: 'Навички' },
        ]}
    />
));

export const CustomRoleAbility = connect(selectorRolesAbilities, actions)(({ abilities, roles, updateItem }: any) => 
    <div className="table">
        <strong className="table-title">Вимоги до навичок кандидатів</strong>
        <table>
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
                        {roles.map((role: any, i: number) => 
                            // <td key={i}>{role.abilityCoefs[index].toFixed(1)}</td>
                            <td key={i}>
                                <EditableInput
                                    storeRoot="roles"
                                    elementKey="abilityCoefs"
                                    elementIndex={i}
                                    index={index}
                                />
                            </td>
                        )}
                    </tr>
                })}
            </tbody>
        </table>
    </div>
);

export const CustomUserAbility = connect(selectorUsersAbilities, actions)(({ abilities, users, updateItem }: any) =>
    <div className="table">
        <strong className="table-title">Навички кандидатів</strong>
        <table>
            <thead>
                <tr>
                    <th></th>
                    {users.map((item: any, index: number) =>
                        <td key={index}>{item.name}</td>
                    )}
                </tr>
            </thead>
            <tbody>
                {abilities.map((item: any, index: number) => {
                    return <tr key={index}>
                        <td>{item.name}</td>
                        {users.map((role: any, i: number) => 
                            <td key={i}>
                                <EditableInput
                                    storeRoot="users"
                                    elementKey="abilityCoefs"
                                    elementIndex={i}
                                    index={index}
                                />
                            </td>
                        )}
                    </tr>
                })}
            </tbody>
        </table>
    </div>
);

export const CustomUsersRolesAbilities = connect(selectorCalculatedAbilities, actions)(({ data, roles }: any) => (
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