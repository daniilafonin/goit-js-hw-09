const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const formEl = document.querySelector('.feedback-form');

const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);

    formData.email = (parsedData.email ?? '').trim();
    formData.message = (parsedData.message ?? '').trim();

    formEl.elements.email.value = formData.email;
    formEl.elements.message.value = formData.message;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

formEl.addEventListener('input', event => {
  const { name, value } = event.target;

  if (!(name in formData)) {
    return;
  }

  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

formEl.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  formEl.reset();
});
