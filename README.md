# Clicker

## Описание

Это кликер, реализованный с использованием **Node.js**, **Express.js**, **MongoDB** и **JWT** для аутентификации пользователей. В проекте реализованы механизмы учета кликов, покупок автокликеров и защиты от чрезмерных запросов через **rate-limiting**.

## Возможности

- Регистрация и аутентификация пользователей.
- Учет кликов каждого пользователя.
- Покупка автокликеров, которые автоматически увеличивают количество кликов.
- Защита от чрезмерных запросов с использованием **rate-limit**.
- Поддержка JWT для аутентификации и авторизации.

## Установка

### Необходимые компоненты

- **Node.js** — Серверная платформа.
- **MongoDB** — База данных.

### Шаги установки

1. Клонируйте репозиторий:

    ```bash
    git clone https://github.com/Ullyminat/Clicker.git
    cd Clicker
    ```

2. Установите зависимости:

    ```bash
    npm install
    ```

3. Настройте файл `.env`:

    Создайте файл `.env` в корне проекта и укажите строку подключения к базе данных MongoDB и порт для запуска сервера:

    ```env
    DB=mongodb://localhost:27017/clicker
    PORT=3008
    SECRET=your_jwt_secret
    ```

4. Запустите сервер:

    ```bash
    npm run dev
    ```

    Сервер будет доступен по адресу: `http://localhost:3008`.

## API Эндпоинты

#### Базовый URL: `/api`

### Пользователи

- **Регистрация нового пользователя**
  - **URL:** `/user/create`
  - **Метод:** `POST`
  - **Тело запроса (JSON):**
    ```json
    {
      "username": "yourUsername",
      "password": "yourPassword"
    }
    ```

- **Вход пользователя**
  - **URL:** `/user/login`
  - **Метод:** `POST`
  - **Тело запроса (JSON):**
    ```json
    {
      "username": "yourUsername",
      "password": "yourPassword"
    }
    ```
  - **Ответ:**
    ```json
    {
      "user": {
        "_id": "user_id",
        "username": "yourUsername"
      },
      "token": "JWT_TOKEN"
    }
    ```

- **Загрузка всех пользователей**
  - **URL:** `/user/load`
  - **Метод:** `GET`

### Клики

- **Добавление клика**
  - **URL:** `/clicker/click`
  - **Метод:** `POST`
  - **Тело запроса (JSON):**
    ```json
    {
      "authorization": "Bearer JWT_TOKEN"
    }
    ```

- **Покупка автокликера**
  - **URL:** `/clicker/buy`
  - **Метод:** `POST`
  - **Тело запроса (JSON):**
    ```json
    {
      "authorization": "Bearer JWT_TOKEN"
    }
    ```

### Прочее

- Защита от слишком частых запросов (например, кликов) с использованием **rate-limiting**.
- Аутентификация и авторизация с использованием **JWT**.

## Структура проекта

```bash
📂 backend
├── 📂 config
│   ├── db_connect.mjs       # Подключение к базе данных MongoDB
│   └── uploader.mjs         # Конфигурация загрузки файлов
├── 📂 controller
│   ├── clickerController.mjs  # Логика обработки запросов для кликов
│   └── userController.mjs     # Логика обработки запросов для пользователей
├── 📂 model
│   ├── clicker.mjs           # Модель данных для кликов
│   └── user.mjs              # Модель данных для пользователей
├── 📂 routes
│   ├── clickerRouter.mjs      # Роутинг для обработки кликов
│   └── userRouter.mjs         # Роутинг для пользователей
├── 📂 middleware
│   ├── Limit.mjs             # Защита от лишних запросов
│   └── Token.mjs             # Middleware для проверки JWT
├── .env                       # Конфигурация окружения
├── index.mjs                  # Главный файл приложения
├── package.json               # Пакетный менеджер
└── README.md                  # Документация
