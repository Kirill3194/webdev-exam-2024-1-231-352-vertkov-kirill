document.addEventListener("DOMContentLoaded", function() {
    // Получаем кнопку, которая открывает модальное окно
    const openModalButton = document.querySelector('button[data-toggle="modal"]');
    const modalElement = document.getElementById('orderModal');
    const modal = new bootstrap.Modal(modalElement);
    const closeModalButton1 = modalElement.querySelector('.close2');
    const closeModalButton2 = document.getElementById('close-modal2');
    const closeModalButton3 = document.getElementById('close-modal1');
    const closeModalButton4 = document.querySelector('.close1');
    const userAccountButton = document.querySelector('#user-account'); // Кнопка для открытия модального окна
    const userAccountModal = new bootstrap.Modal(document.getElementById('userAccountModal')); // Получаем модальное окно

    // Открываем модальное окно при нажатии на кнопку
    openModalButton.addEventListener('click', function() {
        modal.show();
    });

    // Закрываем модальное окно при нажатии на кнопку закрытия
    closeModalButton1.addEventListener('click', function() {
        modal.hide();
        resetForm();  // Сброс формы при закрытии модального окна
    });

    // Закрываем модальное окно при нажатии на кнопку закрытия
    closeModalButton2.addEventListener('click', function() {
        modal.hide();
        resetForm();  // Сброс формы при закрытии модального окна
    });

    // Закрываем модальное окно при нажатии на область вне модального окна
    modalElement.addEventListener('click', function(event) {
        if (event.target === modalElement) {
            modal.hide();
            resetForm();  // Сброс формы при закрытии
        }
    });

    // Добавляем обработчик для кнопки "Submit"
    const submitButton = document.getElementById('submit-request');
    submitButton.addEventListener('click', function() {
        const name = document.getElementById('your-name').value;
        const email = document.getElementById('email-address').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert('Your request has been submitted!');
            // Логика отправки формы или обработки данных
            modal.hide(); // Закрыть окно после отправки
            resetForm();  // Сброс формы после отправки
        } else {
            alert('Please fill in all fields!');
        }
    });

    // Функция для сброса формы
    function resetForm() {
        document.getElementById('order-form').reset();
    }

    // Открытие модального окна при клике на "User Account"
    userAccountButton.addEventListener('click', function(e) {
        e.preventDefault();  // Предотвращаем переход по ссылке
        userAccountModal.show(); // Показываем модальное окно
    });

    closeModalButton3.addEventListener('click', function() {
        userAccountModal.hide()
    });

    closeModalButton4.addEventListener('click', function() {
        userAccountModal.hide()
    });

    // Переход к форме регистрации
    const showRegisterButton = document.getElementById('show-register');
    showRegisterButton.addEventListener('click', function() {
        document.getElementById('login-form').style.display = 'none'; // Скрываем форму входа
        document.getElementById('register-form').style.display = 'block'; // Показываем форму регистрации
        document.getElementById('userAccountModalLabel').textContent = 'User Registration'; // Меняем заголовок модального окна
    });

    // Переход к форме входа
    const showLoginButton = document.getElementById('show-login');
    showLoginButton.addEventListener('click', function() {
        document.getElementById('register-form').style.display = 'none'; // Скрываем форму регистрации
        document.getElementById('login-form').style.display = 'block'; // Показываем форму входа
        document.getElementById('userAccountModalLabel').textContent = 'User Login'; // Меняем заголовок модального окна
    });

    // Обработка отправки формы входа
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Предотвращаем стандартное поведение формы
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (email && password) {
            alert('Login successful!'); // Если все поля заполнены, выводим сообщение об успехе
            userAccountModal.hide(); // Закрываем модальное окно
            window.location.href = 'home.html'; // Перенаправляем на главную страницу после успешной авторизации
        } else {
            alert('Please fill in all fields!'); // Если не все поля заполнены, выводим сообщение об ошибке
        }
    });

    // Обработка отправки формы регистрации
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Предотвращаем стандартное поведение формы
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (email && password && confirmPassword) {
            if (password === confirmPassword) {
                alert('Registration successful!'); // Если пароли совпадают, выводим сообщение об успехе
                userAccountModal.hide(); // Закрываем модальное окно
                window.location.href = 'home.html'; // Перенаправляем на главную страницу после успешной регистрации
            } else {
                alert('Passwords do not match!'); // Если пароли не совпадают, выводим сообщение об ошибке
            }
        } else {
            alert('Please fill in all fields!'); // Если не все поля заполнены, выводим сообщение об ошибке
        }
    });
});
