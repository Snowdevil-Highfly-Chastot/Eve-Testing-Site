import jitaSell from './price_pull_calc';

window.onload = () => {
    let sub_btn = document.getElementById("submit");
    if (sub_btn) {
        console.log("sub_btn was not null");
        console.log(jitaSell);
        sub_btn.addEventListener("click", jitaSell);
    }
};