import React from 'react';

const PreviewPage = (props) => {
    return (
        <div className="page-wrapper">
            <h1 className="title is-1">{props.data.title}</h1>
            {props.data.creatives.map(creative => {
                const width = creative.format.slice(0, creative.format.indexOf('x'));
                const height = creative.format.slice(creative.format.indexOf('x') + 1);
                return(
                    <iframe key={creative.link} src={creative.link} width={width} height={height} frameBorder="0"></iframe>
                );
            })}
        </div>
    );
}

export default PreviewPage;