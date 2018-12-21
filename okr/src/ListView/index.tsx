import * as React from 'react';
import './index.scss';


const ListView = ({ title, onRemove = null }: any) => {
    return (
        <div className="list-view">
            <div className="list-view__header">{title}</div>
            <div className="list-view__items">
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
                <ListViewItem label="Hey" />
            </div>
            <div className="list-view__footer">
                Добавить
            </div>
        </div>
    );
}


const ListViewItem = ({ label, onRemove }: any) => {
    return (
        <div className="list-view__item">
            <div>{label}</div>
            <div className="list-view__item-remove"></div>
        </div>
    );
}


export default ListView;