import axios from "axios";




export async function fetchImages(searchQuery, page) {
    const searchParams = new URLSearchParams({
        key: '41611765-95d63315582311c92a96eb89d',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page
    });

    const { data } = await axios.get(`https://pixabay.com/api/?${searchParams}`);
    return data;
}