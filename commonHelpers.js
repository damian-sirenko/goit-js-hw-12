import{S as d,i as c}from"./assets/vendor-8c59ed88.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const m=o=>o.map(({id:s,webformatURL:r,largeImageURL:a,tags:e,likes:t,views:i,comments:p,downloads:u})=>`<div class="gallery-item">
          <a class="gallery-link" href="${a}">
            <img src="${r}" alt="${e}" class="gallery-img" id="${s}" />
          </a>
          <div class="img-props">
            <div class="item-props">
              <h3 class="item-title-props">Likes</h3>
              <p class="item-value-props">${t}</p>
            </div>
            <div class="item-props">
              <h3 class="item-title-props">Views</h3>
              <p class="item-value-props">${i}</p>
            </div>
            <div class="item-props">
              <h3 class="item-title-props">Comments</h3>
              <p class="item-value-props">${p}</p>
            </div>
            <div class="item-props">
              <h3 class="item-title-props">Downloads</h3>
              <p class="item-value-props">${u}</p>
            </div> 
          </div>
        </div>`).join(""),h="43948789-3afe6d8ecc2e5aa705550f4b3",f="https://pixabay.com/api/",y=(o="")=>{const s=new URLSearchParams({key:h,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${f}?${s}`).then(r=>{if(!r.ok)throw new Error(r.statusText);return r.json()})},g=document.querySelector(".search-form"),l=document.querySelector(".gallery"),n=document.querySelector(".loader"),v=new d(".gallery a",{captionsData:"alt",captionDelay:250});function L(o){o.preventDefault();const s=o.target.elements.search.value.trim();if(s===""){l.innerHTML="",o.target.reset(),c.show({message:"Input field can not be empty",position:"topRight",timeout:2e3,color:"red"});return}l.innerHTML="",n.classList.remove("is-hidden"),y(s).then(r=>{r.total===0&&c.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:2e3,color:"red"}),l.innerHTML=m(r.hits.slice(0,9)),v.refresh()}).catch(function(r){console.log(r)}).finally(()=>{o.target.reset(),n.classList.add("is-hidden")})}g.addEventListener("submit",L);
//# sourceMappingURL=commonHelpers.js.map
