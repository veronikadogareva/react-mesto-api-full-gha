[![Статус тестов](../../actions/workflows/tests.yml/badge.svg)](../../actions/workflows/tests.yml)

# Приложение Mesto
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Фронт приложения написан на React, бэкенд на Express, база данных Mongo DB.

## При регистрации и аутентификации пользователю становятся доступен основной функционал приложения:
* добавление своих картинок-карточек
* редактирования профиля и аватара
* можно удалять, ставить и убирать лайки карточкам

## Бэкенд:
* авторизация и аутентификация
* настроена валидация входящих данных с помощью Joi и Celebrate
* хэширование пароля
* генерация токена для пользователя
* код-стайл AirBnb

Адрес репозитория: https://github.com/veronikadogareva/react-mesto-api-full-gha
## Запуск проекта
- Перед запуском, единожды, сделай установку npm i;
- npm run dev - запуск проекта в режиме разработки;
- npm run build - собирает проект для публикации;
- npm run deploy - выгружает на GH-pages;
- "predeploy": "npm run build";
- "deploy": "gh-pages -d dist";
## Ссылки на проект

IP 158.160.24.177

Frontend https://veronika.theplace.nomoreparties.co/

Backend https://api.veronika.theplace.nomoreparties.co/

## Дальнейшие планы по доработке :
* настроить централизованную обработку ошибок
* добавить отображение isLoading для UX
* добавить англоязычную версию
* доработать мобильную версию для некоторых функций
* добавить подтверждение удаления карточки
* настроить функцию "overlay" для всех попапов
