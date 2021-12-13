import Dev from './dev';
import jitaSell from './price_pull_calc';

let dev = new Dev()
window.onload = () => {

    let content = "This site is in development! We're working very hard to get it running nice and smooth. 😊 Please bear with us!"
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
