import { generatePhotos } from './data.js';
import thumbnailRenderer from './thumbnail-renderer.js';

const photos = generatePhotos(25);
thumbnailRenderer.renderThumbnails(photos);
