import { refs } from "./refs";

 export function renderGallery(images) {
    const renderImg = images.reduce((html, hit) => {  
        html += `<li class="gallery-item">
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
    
    refs.gallery.insertAdjacentHTML('beforeend', renderImg)
}

export function clearGalleryMarkup() {
    refs.gallery.innerHTML = '';
}