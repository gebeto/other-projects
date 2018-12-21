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


const Charts = connect(selectorCalculatedAbilities, actions)(({ data, roles }: any) => {
    return (
        <div>
            {data.map((item: any, index: number) =>
                <Chart
                    key={index}
                    title={item.title}
                    data={item.data}
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
                <div className="col">
                    <div className="row abroles">
                        <div className="abilities">
                            <Abilities />
                        </div>
                        <div className="roles">
                            <Roles />
                        </div>
                        <div className="users">
                            <Users />
                        </div>
                    </div>
                    <div className="col">
                        <CustomRoleAbility />
                        <CustomUserAbility />
                        <CustomUsersRolesAbilities />
                        <Charts />
                    </div>
                </div>
            </div>
        );
    }
}


export default App;