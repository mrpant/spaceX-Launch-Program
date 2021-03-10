import React from 'react';
import { capitalizeFirstLetter } from '../../helper/util';

// TODO : Common Filter Component.
const FilterComponent = ({ title, list, onClickHandler, filterType, selectedItem, ...props }) => {
    return (
        <div className="filter-container">
            <p><strong>{title}</strong></p>
            <hr />
            <div className="filter-list-container">
                {list && list.map((item, index) => {
                    return <button style={{ background: item.text === selectedItem ? '#8bc457' : '#8bc4578c' }} key={index} title={item} onClick={(e) => onClickHandler(e, item, filterType)}>{capitalizeFirstLetter(item.text)}</button>
                })}
            </div>
        </div >
    )
}

export default FilterComponent;