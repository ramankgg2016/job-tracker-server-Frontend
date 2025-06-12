# Job Application Tracker: Full-Stack Web Application

## Overview

This project is a full-stack web application designed to help users track their job applications. It allows users to register, log in, add, view, edit, and delete job applications with various statuses. The application also includes features for searching, filtering, sorting, and paginating applications, alongside a user-friendly interface with light/dark mode.

This solution demonstrates expertise in modern web development, covering both frontend and backend technologies.

## Features Implemented

**User Authentication:**
* User registration and login with secure JSON Web Tokens (JWT).
* Protected routes ensuring only authenticated users can access job application data.
* Session persistence (via JWT in local storage).

**Job Application Management:**
* **Add:** Create new job applications with fields for Company, Role, Date Applied, Status (Applied, Interview Scheduled, Rejected, Offer Received), and Notes.
* **View:** Display a paginated list of all job applications.
* **Edit:** Modify existing job application entries.
* **Delete:** Remove job applications.

**Data Interaction & Display:**
* **Search:** Filter applications by company name or role.
* **Filter:** Display applications based on their status.
* **Sort:** Order applications by date applied (newest/oldest) or company name.
* **Pagination:** Organize the job list into manageable pages.
* **Dashboard Summary:** Provides counts of total applications and applications per status.
* **Color-coded Status Labels:** Visually distinguishes different application statuses for quick scanning.

**User Interface Enhancements:**
* **Light/Dark Mode:** Allows users to switch between different themes for better readability and personal preference.
* **Responsive Design:** Ensures the application is usable and looks good on various devices (desktops, tablets, mobile phones).
* **Clean UI/UX:** Designed for readability and usability, adhering to the "plain HTML/CSS" constraint (no external CSS frameworks).

## Technologies Used

**Frontend:**
* **ReactJS:** For building the dynamic user interface.
* **Context API:** For robust state management across the application.
* **HTML5 & CSS3:** For structuring and styling the UI (no external frameworks).
* **JavaScript (ES6/ES2017):** Modern JavaScript features.
* **Axios:** For making HTTP requests to the backend API.
* **React Router DOM:** For client-side routing.

**Backend:**
* **Node.js & Express.js:** For building the RESTful API server.
* **MongoDB:** NoSQL database for storing user and job application data (hosted on MongoDB Atlas).
* **Mongoose:** ODM (Object Data Modeling) library for MongoDB.
* **JSON Web Tokens (JWT):** For secure user authentication and authorization.
* **Bcrypt.js:** For secure password hashing.
* **CORS:** For handling Cross-Origin Resource Sharing.
* **Express-Validator:** For robust server-side input validation.

## Getting Started

To run this application locally, you will need Node.js and npm (or Yarn) installed. The project is split into two main parts: `client` (frontend) and `server` (backend).

Please refer to the individual `README.md` files for detailed setup and running instructions for each part:

* **[Frontend Setup Guide (`client/README.md`)](client/README.md)**
* **[Backend Setup Guide (`server/README.md`)](server/README.md)**

## Evaluation Criteria (as per challenge)

* **Code structure & clarity:** 20%
* **React and Node.js usage:** 20%
* **RESTful API design:** 15%
* **Authentication & security:** 15%
* **Functionality completeness:** 15%
* **Error handling & validation:** 10%
* **UI/UX polish (basic OK):** 5%






# Job Application Tracker - Frontend (Client)

## Overview

This directory contains the ReactJS frontend for the Job Application Tracker application. It provides the user interface for all interactions, including user authentication, job application management, and various data display features like search, filter, sort, and pagination. The UI is built entirely with plain HTML and CSS to demonstrate core frontend skills.

## Features

* **User Authentication Views:** Register, Login, Logout.
* **Job Dashboard:** Display a paginated list of job applications.
* **Add/Edit Job Forms:** Intuitive forms for creating and updating entries.
* **Search Functionality:** Filter applications by company or role dynamically.
* **Filter by Status:** Selectively show applications based on their status.
* **Sort Options:** Order applications by date applied (newest/oldest) or company name.
* **Pagination Controls:** Navigate through long lists of applications.
* **Color-coded Statuses:** Visual cues for quick status identification.
* **Light/Dark Mode:** Customizable theme toggle for user preference.
* **Responsive Design:** Adapts to various screen sizes (mobile, tablet, desktop).

## Technologies

* **ReactJS** (with Hooks)
* **Context API** (for state management)
* **React Router DOM** (for client-side routing)
* **Axios** (for API communication)
* **HTML5**
* **CSS3** (custom styling, no frameworks)
* **JavaScript (ES6+)**

## Prerequisites

* Node.js (LTS version recommended)
* npm or Yarn (package manager)

## Installation & Setup

1.  **Navigate to the client directory:**
    ```bash
    cd job-application-tracker/client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `client` directory (at the same level as `package.json`). This file tells your React app where to find your backend API.

    ```dotenv
    # .env
    REACT_APP_BACKEND_URL=http://localhost:5000/api
    ```
    * **Important:** Replace `http://localhost:5000` with your deployed backend URL if you deploy your backend separately.

4.  **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The application should open in your browser at `http://localhost:3000` (or another port if 3000 is in use).

## Usage

1.  **Register:** Create a new user account.
2.  **Login:** Log in with your registered credentials.
3.  **Dashboard:** View your job applications.
    * Use the search bar to find specific companies or roles.
    * Filter by status using the dropdown.
    * Sort your applications using the sort dropdown.
    * Navigate through pages using the pagination controls.
    * Click "Add New Application" to add a new entry.
    * Click "Edit" or "Delete" on individual job cards to manage them.
4.  **Theme Toggle:** Use the button in the navigation bar to switch between light and dark modes.

## UI/UX Philosophy

The user interface was crafted with a focus on readability and basic usability.
* **No CSS Frameworks:** All styling is custom-written CSS to demonstrate fundamental CSS skills.
* **Clean Design:** A minimalist approach ensures that information is easy to consume without unnecessary visual distractions.
* **Responsive Layouts:** Flexbox, CSS Grid, and media queries are used to ensure optimal viewing across various screen sizes.

## Deployment

This frontend can be easily deployed to static hosting services like Netlify, Vercel, or GitHub Pages.
* Run `npm run build` (or `yarn build`) to create a production-ready build in the `build` folder.
* Upload the contents of the `build` folder to your chosen hosting service.
* Ensure that `REACT_APP_BACKEND_URL` in your `.env` file (or build configuration) points to your **deployed backend API URL**.


## Contact

For any questions or feedback, please contact: ramankgg2016@gmail.com