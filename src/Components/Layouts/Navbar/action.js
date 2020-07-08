const toogleNav = () => {
    const el = document.querySelector(".nav__link");
    const elHide = document.querySelector(".nav__link.hide");

    if (elHide) {
        el.classList.remove("hide");
    } else {
        el.classList.add("hide");
    }
}

const setActiveNav = (location) => {
    const active = document.querySelector(".nav__link .active");
    const element = document.getElementsByClassName(location)[0];
    if (active) active.classList.remove("active");
    if (element) element.classList.add("active");
}

const toogleClickNav = (location) => {
    document.querySelectorAll(".nav__link > a").forEach(item => {
        item.addEventListener("click", (() => {
            setActiveNav(location);
        }))
    })
}

export {
    toogleNav,
    setActiveNav,
    toogleClickNav
}