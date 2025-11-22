const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const fileInput = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const TAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});


function getTagsFromValue(value) {
  return value.trim().split(' ').filter((tag) => tag.trim().length);
}

function validateTagsFormat(value) {
  if (value.length === 0) {
    return true;
  }
  const tags = getTagsFromValue(value);
  return tags.every((tag) => TAG_REGEX.test(tag));
}

function validateTagsCount(value) {
  const tags = getTagsFromValue(value);
  return tags.length <= MAX_HASHTAG_COUNT;
}

function validateTagsUnique(value) {
  const tags = getTagsFromValue(value);
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
}


function validateComment(value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

pristine.addValidator(
  hashtagField,
  validateTagsFormat,
  'Хэш-тег должен начинаться с #, содержать буквы/цифры и быть не длиннее 20 символов'
);

pristine.addValidator(
  hashtagField,
  validateTagsCount,
  `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэш-тегов`
);

pristine.addValidator(
  hashtagField,
  validateTagsUnique,
  'Хэш-теги не должны повторяться'
);

pristine.addValidator(
  commentField,
  validateComment,
  `Длина комментария не может быть больше ${MAX_COMMENT_LENGTH} символов`
);


function openModal() {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeModal() {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onFileInputChange() {
  openModal();
}

function onCancelButtonClick() {
  closeModal();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
  }
}

function onInputKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

function onFormSubmit(evt) {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
}


function initUploadForm() {
  fileInput.addEventListener('change', onFileInputChange);
  cancelButton.addEventListener('click', onCancelButtonClick);
  hashtagField.addEventListener('keydown', onInputKeydown);
  commentField.addEventListener('keydown', onInputKeydown);

  form.addEventListener('submit', onFormSubmit);
}

export { initUploadForm };
