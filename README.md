# Notes app

[Start Using Now](https://notes-app-abhyas.herokuapp.com)

## Technologies used

1. **React.js**
2. **Express.js**
3. **Mongoose**
4. Node.js
5. MongoDB Atlas
6. Semantic UI React

## Features

1. **Create** notes with title and content
2. **See** notes
3. **Edit** notes
4. **Delete** notes
5. Full **Markdown** support

### UI

1. The app is fully **responsive**.
2. The notes are shown in beautiful **cards** on the notes screen.
3. Delete button shows a **pop up confirmation**.
4. Cards are displayed in a **modal** when clicked on title in the notes screen.
5. Spinner **loading screen** while content loads

### Animations

1. Cards **hover** on mouse hover
2. Cards **fade out on delete**
3. **Button animation** to show that it's **processing**. Eg delete button, create button, update button

## Wishlist

### Feature wishlist

1. Let user **authenticate** themselves.
2. **Search** notes

### UI Wishlist

1. Show cards in pinterest style **mason grid**.

[Try It Out](https://notes-app-abhyas.herokuapp.com)

## Build locally

1. Clone the project in your system
2. Create a `.env` file in your root. Fill the file with data provided below.
3. Provide a MongoDB URI in the `.env` file.
4. In the root folder, install the required dependencies using `npm i`
5. In the frontend folder, install the required dependencies using `npm i`
6. In the root folder, run the `dev` script using `npm run dev`

### .env File

```env
PORT=5000
NODE_ENV=development
MONGO_URI=<Mongo DB URI>

```

[Live Demo of the app](https://notes-app-abhyas.herokuapp.com)
