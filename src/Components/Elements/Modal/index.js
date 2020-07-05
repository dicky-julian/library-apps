import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '../Icons';
import './modal.scss';

export const popModalToogle = (el) => {
    const popModal = document.querySelector('#pop_modal');
    const container = document.querySelector('#pop_modal .modal__container');

    if (popModal && container) {
        const isHide = document.querySelector("#pop_modal.hide");
        if (isHide) {
            isHide.classList.remove("hide");
            isHide.style.display = "flex";
        }
        isHide.classList.add("show");
        ReactDOM.render(el, container);
    }
}

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

export const PopModal = () => {
    return (
        <div id="pop_modal" className="hide" style={{ display: 'none' }}>
            <div className="bg__fade"></div>
            <div className="pop__modal">
                <div><CloseIcon className="c__pointer" onClick={() => hidePopModal()} /></div>
                <div className="modal__container"></div>
            </div>
        </div>
    )
}

const Modal = (props) => {
    const idName = props.id;
    return (
        <div className="modal modal__hide" id={idName} style={{ display: 'none' }}>
            {props.children}
        </div>
    )
}

export const hidePopModal = () => {
    const popModal = document.querySelector('#pop_modal');
    const container = document.querySelector('#pop_modal .modal__container');
    popModal.classList.remove("show");
    popModal.classList.add("hide");
    setTimeout(() => {
        popModal.style.display = "none";
        ReactDOM.unmountComponentAtNode(container);
    }, 500);
}

export default Modal;