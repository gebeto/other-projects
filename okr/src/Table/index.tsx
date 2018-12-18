import * as React from 'react';
import { connect } from 'redux-zero/react';
import { actions } from '../store';

import './index.scss';


const TableRow = connect(undefined, actions)(({ editable, storeKey, item, columns, updateItem }: any) => {
    return (
        <tr>
            {columns.map((column: any, index: number) =>
                <td key={index}>
                    {editable
                        ?
                        <input value={item[column.accessor]} onChange={(e) => {
                            updateItem(storeKey, item, index, column.accessor, e.target.value)
                        }} />
                        :
                        <span>{item[column.accessor]}</span>
                    }
                </td>
            )}
        </tr>
    );
});


const Table = ({ editable = false, storeKey, title, data, columns }: any) => {
    return (
        <div className="table">
            <strong>{title}</strong>
            <table className="table__table">
                <thead>
                    <tr>
                        {columns.map((el: any, index: number) =>
                            <th key={index}>{el.title}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any, index: number) =>
                        <TableRow editable={editable} storeKey={storeKey} key={index} item={item} columns={columns} />
                    )}
                </tbody>
            </table>
        </div>
    );
}


export default Table;