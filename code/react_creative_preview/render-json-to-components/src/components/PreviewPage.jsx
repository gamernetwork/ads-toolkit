import React from 'react';

const PreviewPage = (props) => {
    return (
        <div className="page-wrapper">
            <h1 className="title is-1">{props.data.title}</h1>
        </div>
    );
}

export default PreviewPage;