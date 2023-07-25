const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
export default function renderLoading (isLoading, button) {
    if (isLoading) {
        if (button.textContent.length >= 9) {
            button.textContent = 'Сохранение...';
        } else {
            button.textContent = 'Создание...';
        }

    } else {
        if (button.textContent.length >= 12) {
            button.textContent = 'Сохранить';
        } else {
            button.textContent = 'Создать';
        }
    }
}
