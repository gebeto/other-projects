import * as React from 'react';
import { connect } from 'redux-zero/react';
import { actions } from '../store';

import './index.scss';


const TableRow = connect(undefined, actions)(({ editable, addable, storeKey, item, columns, updateItem, removeItem }: any) => {
    return (
        <tr>
            {columns.map((column: any, index: number) =>
                <React.Fragment key={index}>
                    <td key={index}>
                        {editable
                            ?
                            <input value={item[column.accessor]} onChange={(e) => {
                                updateItem(storeKey, item, column.accessor, e.target.value)
                            }} />
                            :
                            <span>{item[column.accessor]}</span>
                        }
                    </td>
                    {addable ? <td><span onClick={() => removeItem(storeKey, item)}>Видалити</span></td> : null }
                </React.Fragment>
            )}
        </tr>
    );
});


const Table = (props: any) => {
    const { editable = false, addable = false, storeKey, title, data, columns } = props;
    return (
        <div className="table">
            <strong>{title}</strong>
            <table className="table__table">
                <thead>
                    <tr>
                        {columns.map((el: any, index: number) =>
                            <th colSpan={addable ? 2 : 1} key={index}>{el.title}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any, index: number) =>
                        <TableRow addable={addable} editable={editable} storeKey={storeKey} key={index} item={item} columns={columns} />
                    )}
                </tbody>
                {addable ?
                    <tfoot>
                        <tr>
                            <th colSpan={addable ? 2 : 1} onClick={() => {
                                props[`add${addable}`]();
                            }}>Додати</th>
                        </tr>
                    </tfoot>
                    : null
                }
            </table>
        </div>
    );
}


export default connect(undefined, actions)(Table);