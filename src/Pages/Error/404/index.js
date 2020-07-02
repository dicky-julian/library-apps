import React from 'react';
import Empty from '../../Empty';
import './404.scss';

const Error404 = () => {
    return (
        <div className="empty__page">
            <Empty message="Page not Found" />
        </div>
    )
}

export default Error404;