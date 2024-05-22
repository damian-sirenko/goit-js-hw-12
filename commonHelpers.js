import{a as u,S as w,i as l}from"./assets/vendor-c493984e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const g=r=>r.map(({id:t,webformatURL:o,largeImageURL:i,tags:e,likes:s,views:c,comments:L,downloads:b})=>`<div class="gallery-item">
          <a class="gallery-link" href="${i}">
            <img src="${o}" alt="${e}" class="gallery-img" id="${t}" />
          </a>
          <div class="img-props">
            <div class="item-props">
              <h3 class="item-title-props">Likes</h3>
              <p class="item-value-props">${s}</p>
            </div>
            <div class="item-props">
              <h3 class="item-title-props">Views</h3>
              <p class="item-value-props">${c}</p>
            </div>
            <div class="item-props">
              <h3 class="item-title-props">Comments</h3>
              <p class="item-value-props">${L}</p>
            </div>
            <div class="item-props">
              <h3 class="item-title-props">Downloads</h3>
              <p class="item-value-props">${b}</p>
            </div> 
          </div>
        </div>`).join(""),S="43948789-3afe6d8ecc2e5aa705550f4b3";u.defaults.baseURL="https://pixabay.com/api/";const f=async(r,t)=>(await u.get("/",{params:{key:S,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data,E=document.querySelector(".search-form");let h=document.querySelector(".gallery");const n=document.querySelector(".loader"),a=document.querySelector(".load-more-btn");let y=0,p="",d=1;const m=15,P=async r=>{r.preventDefault();const t=r.currentTarget;if(p=t.elements.search.value.trim(),h.innerHTML="",n.classList.remove("is-hidden"),d=1,p===""){l.show({message:"Input field can not be empty",position:"topRight",timeout:2e3,color:"red"}),t.reset(),n.classList.add("is-hidden");return}try{const{total:o,hits:i}=await f(p,d);if(o===0){l.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:2e3,color:"red"}),n.classList.add("is-hidden"),a.classList.add("btn-is-hidden");return}h.insertAdjacentHTML("beforeend",g(i)),a.classList.remove("btn-is-hidden"),y=Math.ceil(o/m),i.length<m?(a.classList.add("btn-is-hidden"),l.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3,color:"red"})):a.classList.remove("btn-is-hidden"),v.refresh()}catch{l.show({message:"An error occurred while fetching images",position:"topRight",timeout:2e3,color:"red"})}finally{n.classList.add("is-hidden")}t.reset()},q=()=>{h.querySelector(".gallery-item:last-child").getBoundingClientRect().height,window.scrollBy({top:1e3,left:0,behavior:"smooth"})};async function M(r){try{d+=1,n.classList.remove("is-hidden");const{hits:t}=await f(p,d);h.insertAdjacentHTML("beforeend",g(t)),v.refresh(),q(),d>=y&&(a.classList.add("btn-is-hidden"),l.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3,color:"red"}))}catch{l.show({message:"An error occurred while fetching more images.",position:"topRight",timeout:2e3,color:"red"}),a.classList.add("btn-is-hidden")}finally{n.classList.add("is-hidden")}}const v=new w(".gallery a",{captionsData:"alt",captionDelay:250});a.addEventListener("click",M);E.addEventListener("submit",P);
//# sourceMappingURL=commonHelpers.js.map
