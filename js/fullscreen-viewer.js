const fullscreenViewer = (function() {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const socialComments = bigPicture.querySelector('.social__comments');
  const socialCaption = bigPicture.querySelector('.social__caption');
  const commentCountBlock = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const cancelButton = bigPicture.querySelector('.big-picture__cancel');

  function openFullscreen(photoData) {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    bigPictureImg.src = photoData.url;
    bigPictureImg.alt = photoData.description;
    likesCount.textContent = photoData.likes;
    commentsCount.textContent = photoData.comments.length;
    socialCaption.textContent = photoData.description;

    commentCountBlock.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    renderComments(photoData.comments);
  }

  function renderComments(comments) {
    socialComments.innerHTML = '';

    comments.forEach((comment) => {
      const commentElement = document.createElement('li');
      commentElement.classList.add('social__comment');

      commentElement.innerHTML = `
        <img
          class="social__picture"
          src="${comment.avatar}"
          alt="${comment.name}"
          width="35" height="35">
        <p class="social__text">${comment.message}</p>
      `;

      socialComments.appendChild(commentElement);
    });
  }

  function closeFullscreen() {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  function onCancelButtonClick() {
    closeFullscreen();
  }

  function onDocumentKeydown(evt) {
    if (evt.key === 'Escape') {
      closeFullscreen();
    }
  }

  function init() {
    cancelButton.addEventListener('click', onCancelButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }

  return {
    openFullscreen,
    init
  };
})();

export default fullscreenViewer;
