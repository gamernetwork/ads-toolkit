import React from 'react';

const PreviewModal = (props) => {
    console.log(props.title)
    return (
        <div className="modal is-active">
            <div onClick={(e) => props.toggleModal(e)} className="modal-background"></div>
            <div className="modal-content">
                <h2 className="subtitle is-size-3-desktop is-size-4-tablet is-size-4-mobile">{props.data.title}</h2>
            </div>
            <button onClick={(e) => props.toggleModal(e)} className="modal-close is-large" aria-label="close"></button>
        </div>
    );
}

export default PreviewModal;