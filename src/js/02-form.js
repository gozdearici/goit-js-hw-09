const feedbackForm = document.querySelector('.feedback-form');
const submitButton = document.querySelector('[type="submit"]');
const localStorageKey = 'feedback-form-state';
let feedbackFormValues = {};

const debounce = (callback, delay = 300) => {
    let timeout;
    
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
};

const saveToLocalStorage = debounce((event) => {
    const { name, value } = event.target;

    console.log(event.target.name)
    if(name === 'email' || name === 'message') {
        feedbackFormValues[name] = value.trim();
        localStorage.setItem(localStorageKey, JSON.stringify(feedbackFormValues));
    }
}, 500);

const clearToLocalStorage = (event) => {
    event.preventDefault();

    const form = event.target;

    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

    if(!email || !message) {
        alert('Lütfen tüm alanları doldurunuz!')
        return;
    }

    const savedData = localStorage.getItem(localStorageKey);
    console.log(JSON.parse(savedData));

    localStorage.removeItem('feedback-form-state');
    form.reset();
};

feedbackForm.addEventListener('input', saveToLocalStorage);
feedbackForm.addEventListener('submit', clearToLocalStorage);

let savedData = localStorage.getItem(localStorageKey);

if(savedData) {
    feedbackFormValues = JSON.parse(savedData);
    
    Object.entries(feedbackFormValues).forEach(([name, value]) => {
        const inputElement = feedbackForm.elements[name];

        if (inputElement) {
            inputElement.value = value;
        }
    });
}
