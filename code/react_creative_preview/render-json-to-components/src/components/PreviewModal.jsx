import React from 'react';

const PreviewModal = (props) => {
    return (
        <div className="modal is-active has-text-white">
            <div onClick={props.closeModal} className="modal-background">
            </div>
            <button onClick={props.closeModal} className="modal-close is-large" aria-label="close"></button>
        </div>
    );
}

export default PreviewModal;
