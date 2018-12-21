import * as React from 'react';
import { connect } from 'redux-zero/react';
import {
    actions,
    selectorCalculatedAbilities,
} from './store';
import {
    Users,
    Roles,
    Abilities,
    CustomRoleAbility,
    CustomUserAbility,
    CustomUsersRolesAbilities,
} from './Table/Tables';
import Chart from './Chart';
import ListView from './ListView/';


const Charts = connect(selectorCalculatedAbilities, actions)(({ data, roles }: any) => {
    return (
        <div>
            {data.map((item: any, index: number) =>
                <Chart
                    key={index}
                    title={item.item_0}
                    data={Object.keys(item)
                        .filter((it: any) => /item_\d+/.test(it) && it !== 'item_0')
                        .map((k: any) => item[k])}
                    labels={roles.map((role: any) => role.name)}
                />
            )}
        </div>
    );
});


class App extends React.Component<any, any> {
    render() {
        return (
            <div className="grid j-center">
                <div className="row w-100">
                    <div className="col p-1 scrollable" style={{ minWidth: 300, maxWidth: 300 }}>
                        <div className="p-b-1">
                            <Roles />
                        </div>
                        <div className="p-b-1">
                            <Abilities />
                        </div>
                        <div className="p-b-1">
                            <Users />
                        </div>
                    </div>
                    <div className="col scrollable p-1 f-1">
                        <CustomRoleAbility />
                        <div className="p-b-1">
                            <CustomUserAbility />
                        </div>
                        <CustomUsersRolesAbilities />
                        <Charts />
                    </div>
                </div>
            </div>
        );
    }
}


export default App;