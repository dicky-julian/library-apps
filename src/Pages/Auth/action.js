import React from 'react';
import { popModalToogle } from '../../Components/Elements/Modal';
import { fetchRegister } from '../../Utils/Api/index';

const showModal = (msg) => {
    let el = <>
        <h4 className="txt__center">{msg}</h4>
        <button className="bt fw__medium ft__cp" style={{margin: '0 auto', display: 'flex'}} onClick={() => window.location.reload()}>OK</button>
    </>
    popModalToogle(el);
}

const register = async(e) => {
    e.preventDefault();
    const fullname = document.querySelectorAll('#form__signup>input')[0].value;
    const uname = document.querySelectorAll('#form__signup>input')[1].value;
    const pass = document.querySelectorAll('#form__signup>input')[2].value;

    if (!fullname || !uname || !pass) return("error")

    await fetchRegister(fullname, uname, pass)
        .then(() => {
            showModal("Successfull regsiter account, lets Login now.");
        })
}

export {
    showModal,
    register
}