import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


import { refs } from "./js/refs";
import { fetchImages } from "./js/pixabay-api";
import { clearGalleryMarkup, renderGallery } from "./js/render-images";
import { lightbox } from "./js/lightbox";
import { smoothScrollToTop } from "./js/smooth";

let currentPage = 1;
let searchQuery;

refs.loadMoreBtn.style.display = 'none';

refs.form.addEventListener('submit', async (event) => {
    event.preventDefault();
    refs.loadMoreBtn.style.display = 'none';
  clearGalleryMarkup();    
    currentPage = 1; 
    searchQuery = refs.input.value.trim();
    if (!searchQuery) {
        iziToast.error({
            position: 'topRight',
            message:
              "Input empty! Try again.",
          });
        return;
    }
    
    try {
        const {hits, totalHits} = await fetchImages(searchQuery, currentPage);

        if (totalHits === 0) {
            iziToast.error({
            position: 'topRight',
            message: "We're sorry, but you've reached the end of search results.",
         });
         return;
        }
renderGallery(hits);   
refs.loadMoreBtn.style.display = 'block';
         lightbox.refresh();
         
         if (currentPage === Math.ceil(totalHits / 40)) {
            iziToast.error({
        position: 'topRight',
            message: "We're sorry, but you've reached the end of search results.",
                          });
         refs.loadMoreBtn.style.display = 'none';
    
          }  
    } catch (error) {
        console.log(error);
        showError("Please try again.")
    }
    
  
    
   
  });


  refs.loadMoreBtn.addEventListener('click', async () => {
    currentPage++;
    
    try {
      const {hits, totalHits} = await fetchImages(searchQuery, currentPage);
renderGallery(hits);
lightbox.refresh();
smoothScrollToTop();   

      if (currentPage === Math.ceil(totalHits / 40)) {
        iziToast.error({
    position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
                      });
     refs.loadMoreBtn.style.display = 'none';

      }  
    } catch (error) {
        console.log(error);
    }
  });


//  async function searchImg(params) {
//     loader.style.display = 'block';
//     gallery.style.display = 'none';

//     try {
      
// const { hits } = response.data;
       
//         if (hits.length > 0) {
                 

//           if (currentPage === 1) {
//             loadMoreBtn.style.display = 'block';
//         } else {
//             loadMoreBtn.style.display ='none';
//         }
          
//           smoothScrollToTop();
//         } else {
//           gallery.style.display = 'none';
//           endOfCollection.style.display = "block";
//           
//         }
      
//     } catch (error) {
//         console.error(error);
//       } finally {
//         loader.style.display = "none";
//         gallery.style.display = "flex";
//       }
//   }


