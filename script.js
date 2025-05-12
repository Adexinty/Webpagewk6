const button = document.getElementById('actionBtn');
const messageDiv = document.getElementById('message');
let buttonStates = [
    { text: 'Click Me!', color: '#007bff' },
    { text: 'Try Again!', color: '#eF6c00' },
    { text: 'Keep Going!', color: '#6f42c1' }
];
let currentState = 0;

// Button Click Event
button.addEventListener('click', () => {
    button.classList.add('clicked');
    currentState = (currentState + 1) % buttonStates.length;
    button.textContent = buttonStates[currentState].text;
    button.style.backgroundColor = buttonStates[currentState].color;
    showMessage('Button Clicked!');
    setTimeout(() => button.classList.remove('clicked'), 200);
});

// Hover Effect
button.addEventListener('mouseenter', () => {
    showMessage('Hovering...');
});

button.addEventListener('mouseleave', () => {
    showMessage('');
});

// Keypress Detection
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        button.click();
        showMessage('Enter Key Pressed!');
    } else {
        showMessage(`Key Pressed: ${event.key}`);
    }
});

// Secret Action: Double Click
button.addEventListener('dblclick', () => {
    button.classList.add('secret-activated');
    showMessage('Secret Activated! 🌟');
    document.body.style.backgroundColor = '#ffeaa7';
    setTimeout(() => {
        button.classList.remove('secret-activated');
        document.body.style.backgroundColor = '#f0f0f0';
        showMessage('');
    }, 3000);
});

// Display Message
function showMessage(text) {
    messageDiv.textContent = text;
    if (text) {
        messageDiv.classList.add('show');
    } else {
        messageDiv.classList.remove('show');
    }
}

// Slideshow Logic
let slideIndex = 0;
const slides = document.getElementsByClassName('slide');
showSlide(slideIndex);

function changeSlide(n) {
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    showSlide(slideIndex);
}

function showSlide(n) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    slides[n].classList.add('active');
}

// Tab Logic
const tabButtons = document.getElementsByClassName('tab-btn');
const tabContents = document.getElementsByClassName('tab-content');

function openTab(index) {
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
        tabContents[i].classList.remove('active');
    }
    tabButtons[index].classList.add('active');
    tabContents[index].classList.add('active');
}

// Form Validation
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Real-time Validation
nameInput.addEventListener('input', () => validateField(nameInput, nameError, nameInput.value.trim() !== ''));
emailInput.addEventListener('input', () => validateField(emailInput, emailError, isValidEmail(emailInput.value)));
passwordInput.addEventListener('input', () => validateField(passwordInput, passwordError, isValidPassword(passwordInput.value)));

function validateField(input, errorDiv, isValid) {
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorDiv.classList.remove('show');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        errorDiv.classList.add('show');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
}

function validateForm() {
    const isNameValid = nameInput.value.trim() !== '';
    const isEmailValid = isValidEmail(emailInput.value);
    const isPasswordValid = isValidPassword(passwordInput.value);

    validateField(nameInput, nameError, isNameValid);
    validateField(emailInput, emailError, isEmailValid);
    validateField(passwordInput, passwordError, isPasswordValid);

    if (isNameValid && isEmailValid && isPasswordValid) {
        showMessage('Form Submitted Successfully!');
        nameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        nameInput.classList.remove('valid', 'invalid');
        emailInput.classList.remove('valid', 'invalid');
        passwordInput.classList.remove('valid', 'invalid');
    } else {
        showMessage('Please fix the errors in the form.');
    }
}
