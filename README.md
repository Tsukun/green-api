# Тестовое задания для green-api

### В рамках тестового задания требуется разработать пользовательский интерфейс для отправки и получений сообщений WhatsApp.

#### Инструкция по запуску

1. Выполнить в корневой директории `npm install`
2. Запустить `npm start` в корневой директории

#### Инструкция по использованию

1. Ввести данные из green-api в соответсвующие поля ввода
2. Ввести номер собеседника и нажать "Enter", чат добавится в колонку
3. При нажатии на чат, в правой области отобразится история сообщение
   1. Для отправки сообщения, в текстовом поле "Say something..." ввести сообщение и нажать клавишу "Enter"
4. Кнопка Clear All Chats очищает все диалоги и удаляет данные из localStorage 
5. Кнопка Update Chat Message обновляет все диалоги в списке (сделано кнопкой чтобы не выйти за лимит вызова api)
