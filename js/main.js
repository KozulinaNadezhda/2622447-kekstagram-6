import { generatePhotos } from './data.js';
import thumbnailRenderer from './thumbnail-renderer.js';
import fullscreenViewer from './fullscreen-viewer.js';
import { initUploadForm } from './upload-form.js';

const photos = generatePhotos(25);
thumbnailRenderer.renderThumbnails(photos);
fullscreenViewer.init();

initUploadForm();

document.querySelector('.pictures').addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture');
  if (thumbnail) {
    evt.preventDefault();
    const photoId = parseInt(thumbnail.dataset.photoId, 10);
    const photoData = photos.find((photo) => photo.id === photoId);
    if (photoData) {
      fullscreenViewer.openFullscreen(photoData);
    }
  }
});
