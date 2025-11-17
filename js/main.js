import { generatePhotos } from './data.js';
import thumbnailRenderer from './thumbnail-renderer.js';
import fullscreenViewer from './fullscreen-viewer.js';

const photos = generatePhotos(25);
thumbnailRenderer.renderThumbnails(photos);
fullscreenViewer.init();

document.querySelector('.pictures').addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture');
  if (thumbnail) {
    const image = thumbnail.querySelector('.picture__img');
    const photoId = image.src.split('/').pop().split('.')[0];
    const photoData = photos.find((photo) => photo.id === parseInt(photoId, 10));
    if (photoData) {
      fullscreenViewer.openFullscreen(photoData);
    }
  }
});
