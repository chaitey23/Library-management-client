# 📚 Library Management System - Client

## 📝 Project Overview  
This is the **frontend** of the Library Management System built with React. It provides an interactive and responsive user interface for browsing, borrowing, and managing books. The system is designed to make a school’s library management process easier and more efficient.

## 🌐 Live Demo  
[🔗 Visit Live Site](https://library-management-31a51.web.app/)

## ✨ Key Features  
- 🔐 **Authentication**: Firebase Email/Password and Google/GitHub login support.  
- 📑 **Private Routes**: Protects routes like **All Books**, **Add Book**, and **Borrowed Books**.  
- 🏷 **Book Categories**: View books by category, filter available books, and toggle between card/table views.  
- ⭐ **Borrowing System**: Borrow modal with quantity update, prevent duplicate borrowing, and return tracking.  
- 🎨 **Animations**: Framer Motion for smooth transitions and Swiper for a modern slider/carousel.  
- 🔄 **JWT Validation**: Secure communication between client and server for protected operations.  
- 📱 **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop devices.  

## 🛠️ Technologies Used  
- **React 19**  
- **React Router DOM**  
- **Firebase Authentication**  
- **Axios** (with JWT)  
- **Framer Motion**  
- **Swiper JS**  
- **Tailwind CSS**  
- **React Toastify**  
- **React Rating Stars Component**  
- **React Hook Form**  

## 🖼️ Screenshots 
### Home Page 
![Home Page](./screenshort-Home.png) 
### Book Categories (Private Route) 
![Book Categories](./Screenshot-Book%20Categories.png)
### Borrowed Books (private Route)
![Browse details Tips](./screenshort-Borrowed%20Books.png)

## ⚙️ Setup & Installation  
Follow these steps to run the project locally:  

```bash
# 1. Clone the repository
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-chaitet23

# 2. Navigate into the project folder
cd library-management-client   # Replace with your actual folder name if different

# 3. Install dependencies
npm install

# 4. Add your Firebase configuration to a .env.local file
# Example:
# VITE_apiKey=YOUR_API_KEY
# VITE_authDomain=YOUR_AUTH_DOMAIN
# VITE_projectId=YOUR_PROJECT_ID
# VITE_storageBucket=YOUR_STORAGE_BUCKET
# VITE_messagingSenderId=YOUR_MESSAGING_SENDER_ID
# VITE_appId=YOUR_APP_ID

# 5. Start the development server
npm run dev
