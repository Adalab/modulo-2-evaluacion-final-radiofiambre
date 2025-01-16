const v=document.querySelector(".js-input"),p=document.querySelector(".js-btnSearch");let h=document.querySelector(".js-favList"),o=document.querySelector(".js-resultsList");const w=document.querySelector(".js-btnRemoveAll"),y=document.querySelector(".js-btnReset");let m=[],c=[];function F(t){t.preventDefault();const s=`https://api.jikan.moe/v4/anime?q=${v.value.toLowerCase()}`;fetch(s).then(n=>n.json()).then(n=>{m=n.data,o.innerHTML="";for(const i of m){const r=i.images.jpg.image_url,u=i.title,g="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png",L="https://placehold.co/225?text=Sin+imagen&font=roboto.png";r===g?o.innerHTML+=`
            <li class="card">
                <img src="${L}" alt="">
                <h3>${u}</h3>
            </li>
            `:o.innerHTML+=`
            <li class="card">
                <img src="${r}" alt="">
                <h3>${u}</h3>
            </li>
            `}l()})}p.addEventListener("click",F);function a(){h.innerHTML="",c.forEach(t=>h.innerHTML+=`
    <li class="card fav">
        <button class="btnX">&#10006;</button>
        <img src="${t.img}" alt="">
        <h3>${t.title}</h3>
    </li>
    `)}function l(){o.querySelectorAll("h3").forEach(e=>{const s=e.textContent;c.find(i=>i.title===s)?e.parentElement.classList.add("favResult"):e.parentElement.classList.remove("favResult")})}function d(){localStorage.setItem("Favorite Shows:",JSON.stringify(c))}function q(t){const e=t.target.closest("li");if(e!==o){const s=e.querySelector("img").src,n=e.querySelector("h3").textContent,i={img:s,title:n};c.push(i),a(),d(),l()}}o.addEventListener("click",q);function E(){const t=localStorage.getItem("Favorite Shows:");t&&(c=JSON.parse(t),a())}E();function S(t){t.classList.remove("fav");const e=t.querySelector("h3").textContent,s=c.findIndex(n=>n.title===e);c.splice(s,1),a(),d(),l()}function b(t){const e=t.target.parentElement;S(e)}document.body.addEventListener("click",t=>{t.target.classList.contains("btnX")&&b(t)});function f(){document.querySelectorAll(".fav").forEach(e=>{S(e)})}w.addEventListener("click",f);function I(){f(),o="",v.value=""}y.addEventListener("click",I);
//# sourceMappingURL=main.js.map
