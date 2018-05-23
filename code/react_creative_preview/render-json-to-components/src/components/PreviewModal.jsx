import React from 'react';

const PreviewModal = (props) => {
    return (
        <div className="modal is-active">
            <div onClick={(e) => props.toggleModal(e)} className="modal-background"></div>
            <div className="modal-content">
            </div>
            <button onClick={(e) => props.toggleModal(e)} className="modal-close is-large" aria-label="close"></button>
        </div>
    );
}

export default PreviewModal;