import axios from "axios";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.getElementById("search-form");
const gallery = document.getElementById("gallery");
const loader = document.querySelector(".loader");
const input = document.querySelector("input");
const loadMoreBtn = document.querySelector(".load-more-btn");
const endOfCollection = document.querySelector(".end-of-collection");
let currentPage = 1;

let param = {
    key: '41611765-95d63315582311c92a96eb89d',
    q: 'cat',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
};

loadMoreBtn.style.display = 'none';

form.addEventListener('click', async event => {
    event.preventDefault();
  
    if (event.target.type === 'submit') {
        param.q = input.value;
        currentPage = 1;
      const searchParams = new URLSearchParams({ ...param, page:currentPage });
     await searchImg(searchParams);
    }
    form.reset();
  });

  loadMoreBtn.addEventListener('click', async () => {
    currentPage++;
    const newSearchParams = new URLSearchParams({ ...param, page: currentPage });
     await searchImg(newSearchParams);
  });
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    param.q = input.value;
    currentPage = 1; 
    const searchParams = new URLSearchParams({ ...param, page: currentPage });
    await searchImg(searchParams);
  
    
    if (gallery.children.length > 0) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
    }
  });



 async function searchImg(params) {
    loader.style.display = 'block';
    gallery.style.display = 'none';

    try {
        const response = await
        axios.get(`https://pixabay.com/api/?${params}`);
        

const { hits } = response.data;
       
        if (hits.length > 0) {
          const renderImg = hits.reduce((html, hit) => {
            
              html +=
              `<li class="gallery-item">
          <a href=${hit.largeImageURL}> 
            <img class="gallery-img" src =${hit.webformatURL} alt=${hit.tags}/>
          </a>
          <div class="gallery-text-box">
            <p>likes: <span class="text-value">${hit.likes}</span></p>
            <p>views: <span class="text-value">${hit.views}</span></p>
            <p>comments: <span class="text-value">${hit.comments}</span></p>
            <p>downloads: <span class="text-value">${hit.downloads}</span></p>
        </div>
        </li>`;
        return html;
          }, '');

          gallery.innerHTML = renderImg;
  
          let lightbox = new SimpleLightbox('.gallery a', {
            nav: true,
            captionDelay: 250,
            captionsData: 'alt',
            close: true,
            enableKeyboard: true,
            docClose: true,
          });
          lightbox.refresh();

          smoothScrollToTop();
        } else {
          gallery.style.display = 'none';
          endOfCollection.style.display = "block";
          iziToast.error({
            position: 'topRight',
            message:
              "We\'re sorry, but you\'ve reached the end of search results.",
          });
        }
      
    } catch (error) {
        console.error(error);
      } finally {
        loader.style.display = "none";
        gallery.style.display = "flex";
      }
  }


function smoothScrollToTop() {
    window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
}

