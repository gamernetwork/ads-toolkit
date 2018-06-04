import React from 'react';
import renderHTML from 'react-render-html';

const PreviewModal = (props) => {
    if(props.hideShow === true) {
        return (
            <div className="modal is-active has-text-white">
                <div onClick={(e) => props.closeModal(e)} className="modal-background">
                </div>
                <div className="modal-content preview-content">
                { props.page !== null && renderHTML(props.page) }
                </div>
                <button onClick={(e) => props.closeModal(e)} className="modal-close is-large" aria-label="close"></button>
            </div>
        );
    } else {
        return false;
    }

}

export default PreviewModal;
