# Product Management System

Система управления товарами.

## Требования

- Node.js 18+
- Docker и Docker Compose
- Git

## Быстрый старт

### 1. Запуск бэкенда

```bash
# Переходим в папку бэкенда
cd backend

# Устанавливаем зависимости
npm install

# Запускаем бэкенд с базой данных
npm run start:docker
```

### 2. Запуск фронтенда

```bash
# В новом терминале переходим в папку фронтенда
cd frontend

# Устанавливаем зависимости
npm install

# Запускаем фронтенд
npm run dev
```

## Доступ к приложению

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger API Docs: http://localhost:8080/api

## Основной функционал

- ✨ Просмотр списка товаров с пагинацией
- 🔍 Поиск товаров по названию
- ➕ Создание новых товаров
- 📝 Редактирование существующих товаров
- 🗑️ Удаление товаров
- 📸 Загрузка изображений товаров
- 💰 Управление ценами и скидками

## Технический стек

### Frontend
- React + TypeScript
- Ant Design для UI компонентов
- React Query для управления состоянием
- React Router для маршрутизации
- Vite для сборки

### Backend
- NestJS + TypeScript
- PostgreSQL в качестве базы данных
- TypeORM для работы с БД
- Swagger для API документации
- Docker для контейнеризации

## Разработка

### Структура бэкенда
- `src/products/` - Модуль управления товарами
- `src/products/controllers/` - Контроллеры API
- `src/products/services/` - Бизнес-логика
- `src/products/entities/` - Модели данных
- `uploads/` - Папка для загруженных изображений

### Структура фронтенда
- `src/components/` - React компоненты
- `src/api/` - API клиент
- `src/types/` - TypeScript типы
- `src/styles/` - Стили компонентов

## Переменные окружения

### Backend (.env)
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=products_db
```

Все необходимые переменные окружения для разработки уже настроены в `docker-compose.yml`

