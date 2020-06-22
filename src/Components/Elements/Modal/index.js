import React from 'react';
import './modal.scss';

export const modalToogle = (id) => {
    const el = document.getElementById(id);
    const status = el.classList.contains("modal__show");
    if (el) {
        if (!status) {
            el.style.display = "block";
            el.classList.remove("modal__hide");
            el.classList.add("modal__show");
        } else {
            el.classList.remove("modal__show");
            el.classList.add("modal__hide");
            setTimeout(() => {
                el.style.display = "none"
            }, 500)
        }
    }
}

const Modal = (props) => {
    const idName = props.id;
    return (
        <div className="modal modal__hide" id={idName} style={{display: 'none'}}>
            {props.children}
        </div>
    )
}

export default Modal;