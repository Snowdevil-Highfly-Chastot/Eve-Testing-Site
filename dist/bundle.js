(()=>{"use strict";const e=function(){console.log("test")};function t(e,t,n,o){return r=this,i=void 0,a=function(){return function(e,t){var n,o,r,i,l={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;l;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return l.label++,{value:i[1],done:!1};case 5:l.label++,o=i[1],i=[0];continue;case 7:i=l.ops.pop(),l.trys.pop();continue;default:if(!((r=(r=l.trys).length>0&&r[r.length-1])||6!==i[0]&&2!==i[0])){l=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){l.label=i[1];break}if(6===i[0]&&l.label<r[1]){l.label=r[1],r=i;break}if(r&&l.label<r[2]){l.label=r[2],l.ops.push(i);break}r[2]&&l.ops.pop(),l.trys.pop();continue}i=t.call(e,l)}catch(e){i=[6,e],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}(this,(function(r){return fetch(e).then((function(e){return e.json()})).then((function(e){!function(e){document.getElementById("result_container").style.display="";for(var t=document.getElementById("results"),n=0;n<e.length;n++){for(var o=document.createElement("tr"),r=0;r<e[n].length;r++){var i=document.createElement("td");i.textContent=e[n][r],o.appendChild(i)}t.appendChild(o)}}(t.map((function(t){return[e[t][n][o]]})))})),[2]}))},new((l=void 0)||(l=Promise))((function(e,t){function n(e){try{c(a.next(e))}catch(e){t(e)}}function o(e){try{c(a.throw(e))}catch(e){t(e)}}function c(t){var r;t.done?e(t.value):(r=t.value,r instanceof l?r:new l((function(e){e(r)}))).then(n,o)}c((a=a.apply(r,i||[])).next())}));var r,i,l,a}const n=function(){console.log("jitaSell ran");var e=function(){var e=document.getElementById("type_id_list").value.split("\n");return console.log(e),e&&e.length?(alert("ID list must be filled out"),null):e}(),n=[],o="https://market.fuzzwork.co.uk/aggregates/?station=60003760&types=",r="sell",i="min",l=0;if(e)if(e.length<200)t(o+e.join(","),e,r,i);else{for(var a=0;a<e.length;a++)n.push(e[a]),l>=200&&(t(o+n.join(","),n,r,i),l=0,n=[]),l++;n.length>0&&t(o+n.join(","),n,r,i)}};window.onload=function(){var t=document.getElementById("sidebar-dynamic-content");t&&(t.innerHTML="This here is an awesome sidebar to demonstrate the capability of adding side-bar information to the website. <br> <br> Sidebars create an organized looking site when it come to delivering a ton of information");var o=document.getElementById("submit");o&&(console.log("sub_btn was not null"),console.log(n),o.addEventListener("click",n));var r=document.getElementById("dev_btn");r&&(console.log("dev_btn was not null"),r.addEventListener("click",e))}})();