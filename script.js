// Навигация между секциями
const navButtons = document.querySelectorAll('.nav-btn');
const contentSections = document.querySelectorAll('.content-section');

navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = button.getAttribute('data-section');
        
        // Удаляем активный класс
        navButtons.forEach(btn => btn.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));
        
        // Добавляем активный класс
        button.classList.add('active');
        document.getElementById(targetSection).classList.add('active');
    });
});

// Цитаты
const quotes = [
    {
        text: "Каждая система имеет уязвимость. Нужно только знать, где искать.",
        author: "V",
        source: "ВЗЛОМ КОРПОРАТИВНОЙ СЕТИ"
    },
    {
        text: "В киберпространстве нет правил. Есть только код и те, кто его контролируют.",
        author: "V",
        source: "ОПЕРАЦИЯ НОЧНОЙ ГОРОД"
    },
    {
        text: "Импланты делают тебя сильнее, но навыки делают тебя непобедимым.",
        author: "V",
        source: "ТРЕНИРОВОЧНАЯ СЕССИЯ"
    },
    {
        text: "Корпорации думают, что контролируют город. Они ошибаются.",
        author: "V",
        source: "ПОДРЫВ СИСТЕМЫ"
    },
    {
        text: "Я не работаю за деньги. Я работаю за репутацию. Деньги просто следуют.",
        author: "V",
        source: "ПЕРЕГОВОРЫ С КЛИЕНТОМ"
    }
];

let currentQuote = 0;

function updateQuote() {
    const quoteText = document.getElementById('quoteText');
    const quote = quotes[currentQuote];
    
    quoteText.style.opacity = '0';
    
    setTimeout(() => {
        quoteText.textContent = quote.text;
        quoteText.style.opacity = '1';
    }, 300);
    
    updateIndicators();
}

function updateIndicators() {
    const indicatorsContainer = document.getElementById('quoteIndicators');
    indicatorsContainer.innerHTML = '';
    
    quotes.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'quote-indicator';
        if (index === currentQuote) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => {
            currentQuote = index;
            updateQuote();
        });
        indicatorsContainer.appendChild(indicator);
    });
}

document.getElementById('prevQuote').addEventListener('click', () => {
    currentQuote = (currentQuote - 1 + quotes.length) % quotes.length;
    updateQuote();
});

document.getElementById('nextQuote').addEventListener('click', () => {
    currentQuote = (currentQuote + 1) % quotes.length;
    updateQuote();
});

// Инициализация индикаторов цитат
updateIndicators();

// Эффект глитча для изображения профиля
const profileImage = document.getElementById('profileImage');
let glitchInterval;

function startGlitch() {
    glitchInterval = setInterval(() => {
        if (Math.random() > 0.95) {
            profileImage.style.filter = 'contrast(1.5) brightness(1.2) saturate(2)';
            profileImage.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            
            setTimeout(() => {
                profileImage.style.filter = 'contrast(1.1) brightness(0.9)';
                profileImage.style.transform = 'translate(0, 0)';
            }, 100);
        }
    }, 2000);
}

startGlitch();

// Валидация и отправка формы
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

contactForm.addEventListener('submit', (e) => {
    // Скрыть сообщения
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    // Получить значения
    const name = contactForm.querySelector('[name="Позывной"]').value.trim();
    const email = contactForm.querySelector('[name="Email"]').value.trim();
    const message = contactForm.querySelector('[name="Сообщение"]').value.trim();
    
    // Валидация
    const errors = [];
    
    if (name.length < 2) {
        errors.push('Позывной должен содержать минимум 2 символа');
    }
    
    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('Введите корректный защищенный канал связи (Email)');
    }
    
    if (message.length < 10) {
        errors.push('Детали задания должны содержать минимум 10 символов');
    }
    
    // Показать ошибки
    if (errors.length > 0) {
        e.preventDefault();
        errorMessage.innerHTML = errors.join('<br>');
        errorMessage.style.display = 'flex';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }
    
    // Если валидация прошла, форма отправится через FormSubmit
    // Показываем сообщение об успехе
    setTimeout(() => {
        successMessage.style.display = 'flex';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
});

// Валидация email в реальном времени
const emailInput = contactForm.querySelector('[name="email"]');
emailInput.addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailRegex.test(this.value)) {
        this.style.borderColor = 'var(--cyber-red)';
        this.style.boxShadow = '0 0 15px var(--cyber-red)';
    } else {
        this.style.borderColor = 'var(--cyber-yellow)';
        this.style.boxShadow = '';
    }
});
