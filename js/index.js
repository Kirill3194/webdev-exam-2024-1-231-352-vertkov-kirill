document.addEventListener("DOMContentLoaded", function() {
    // Получаем кнопку, которая открывает модальное окно
    const openModalButton = document.querySelector('button[data-toggle="modal"]');
    const modalElement = document.getElementById('orderModal');
    const modal = new bootstrap.Modal(modalElement);
    const closeModalButton1 = modalElement.querySelector('.close');
    const closeModalButton2 = document.getElementById('close-modal');

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
});
