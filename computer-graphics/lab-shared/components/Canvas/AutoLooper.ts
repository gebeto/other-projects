import * as React from 'react';
import { connect } from 'redux-zero/react';

import Looper from './Looper';


export const AutoLoop = connect(
    (state: any) => ({
        items: state.items
    })
)(() => {
    Looper.makeLoop();
    return null;
});