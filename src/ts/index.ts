import Dev from './dev';
import jitaSell from './price_pull_calc';

let dev = new Dev()
window.onload = () => {

    let content = "This here is an awesome sidebar to demonstrate the capability of adding side-bar information to the website. <br> <br> Sidebars create an organized looking site when it come to delivering a ton of information"
    let sidebar = document.getElementById("sidebar-dynamic-content");
    if (sidebar) {
        sidebar.innerHTML = content;
    }

    let sub_btn = document.getElementById("submit");
    if (sub_btn) {
        console.log("sub_btn was not null");
        console.log(jitaSell);
        sub_btn.addEventListener("click", jitaSell);
    }

    let dev_btn = document.getElementById("dev_btn");
    if (dev_btn) {
        console.log("dev_btn was not null");
        dev_btn.addEventListener('click', async () => { await dev.devGetJsonFromPromise(); });
    }
};
