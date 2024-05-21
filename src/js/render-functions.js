export const galleryMarkup = images => {
  return images
    .map(
      ({
        id,
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" class="gallery-img" id="${id}" />
          </a>
          <div class="img-props">
            <div class="item-props">
              <h3 class="item-title-props">Likes</h3>
              <p class="item-value-props">${likes}</p>
            </div>
            <div class="item-props">
              <h3 class="item-title-props">Views</h3>
              <p class="item-value-props">${views}</p>
            </div>
            <div class="item-props">
              <h3 class="item-title-props">Comments</h3>
              <p class="item-value-props">${comments}</p>
            </div>
            <div class="item-props">
              <h3 class="item-title-props">Downloads</h3>
              <p class="item-value-props">${downloads}</p>
            </div> 
          </div>
        </div>`
    )
    .join('');
};
