import React from 'react';
import renderHTML from 'react-render-html';

const PreviewModal = (props) => {
    console.log(props.page)
    return (
        <div className="modal is-active has-text-white">
            <div onClick={props.closeModal} className="modal-background">
            </div>
            <div className="modal-content preview-content">
                {renderHTML(props.page)}
            </div>
            <button onClick={props.closeModal} className="modal-close is-large" aria-label="close"></button>
        </div>
    );
}

export default PreviewModal;
