import React from 'react';
import empty from '../../Assets/images/empty.png';

const Empty = (props) => {
    return (
        <div className="empty">
            <img src={empty} alt="empty"/>
            <h4>{props.message}</h4>
        </div>
    )
}

export default Empty;