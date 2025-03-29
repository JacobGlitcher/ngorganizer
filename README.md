# Angular 19 Test Task

This project is a test task built with Angular 19 to demonstrate various features, tools, and functionalities. Below is an overview of the implementation, features, and tools used in this project.

## Features

- **Tailwind CSS and Zorro:** Integrated Tailwind CSS for utility-first styling and Ng-Zorro (Ant Design for Angular) for pre-built UI components.
- **Authentication Pages:** Added Login and Register pages for user authentication.
- **Credential Storage:**
  - User credentials and active session data are stored in localStorage and sessionStorage.
  - **localStorage:** Persists registration data even after the browser is closed.
  - **sessionStorage:** Stores active session data, which is cleared when the window is closed.
- **Credential Security:** Implemented hashing for securely storing user credentials.
- **Routing Guards:** Added guards to protect protected routes, ensuring only authenticated users can access them.
- **Form Validation:** Included basic validation for forms on the login and register pages.
- **Error Handling:** Displayed error messages on the login and register pages for better user feedback(to activate try to register if already registered).
- **Todo Page with CRUD:**
  - Built a fully functional Todo page with Create, Read, Update, and Delete (CRUD) operations.
  - Used JSONBin as a mock database for storing and retrieving todo data.
- State Management & Reactivity:
  - Utilized Signals, Observables, and NGXS to demonstrate different approaches to state management and reactivity in Angular.
- **Todo Functionality:**
  - Added features like add todo, delete todo, update todo, sort by name, and pagination for the todo list.
- **Responsive Design:** Ensured the application is responsive across different screen sizes.
- **Code Quality:**
  - Integrated ESLint for linting and Prettier for code formatting to maintain consistency and quality.
  - Added comments throughout the codebase for better readability and maintainability.
- **Deployment:** Deployed the application to Vercel for hosting.

## Tech Stack

- **Angular 19:** Core framework for building the application.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Ng-Zorro:** UI component library for Angular.
- **JSONBin:** Mock database for the todo feature.
- **NGXS:** State management library.
- **ESLint** & Prettier: Tools for code quality and formatting.
- **Vercel:** Hosting platform for deployment.

## Setup Instructions

**Install Dependencies:**

```bash
npm install
```

**Run the Application:**

```bash
ng serve
```

then: Open your browser and navigate to http://localhost:4200.

**Build for Production:**

```bash
ng build
```

## Notes

- The project showcases a mix of modern Angular features (Signals, Observables) alongside state management with NGXS.
- Comments are added throughout the code to explain key implementation details.
- The application is deployed to Vercel, and the live URL can be shared upon request.
