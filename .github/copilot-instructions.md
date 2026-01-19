# Copilot Instructions for myPortfolio

Welcome to the `myPortfolio` codebase! This document provides essential guidelines for AI coding agents to be productive and effective contributors to this project. Please follow these instructions carefully to maintain consistency and quality.

---

## Project Overview

`myPortfolio` is an interactive portfolio built with React and TypeScript. It showcases the developer's identity and skills through various sections, including:

- **About Me**: Personal introduction.
- **Projects**: Highlights of past work.
- **Pros and Cons**: Strengths and areas for improvement.
- **Responsive Design**: Optimized for various devices.

The project is deployed on **Vercel** and uses **Firebase** for backend services, including authentication and Firestore.

---

## Codebase Structure

### Key Directories

- **`src/components`**: Contains reusable UI components. Examples:
  - `AboutMe/`: Components for the "About Me" section.
  - `Project/`: Components for project showcases.
- **`src/pages`**: Page-level components, such as `Main.tsx`.
- **`src/api`**: API route definitions.
- **`src/firebase`**: Firebase configuration.
- **`public/resources`**: Static assets like images, CSS, and JSON data.

### Data Flow

- **Frontend**: React components fetch and display data.
- **Backend**: Firebase handles authentication and Firestore manages data storage.

---

## Development Workflow

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

### Testing

- Run tests:
  ```bash
  npm test
  ```
- Test files are located in `src/setupTests.js`.

### Build

- Create a production build:
  ```bash
  npm run build
  ```

---

## Conventions

### Styling

- Use **SCSS modules** for styling components (e.g., `Component.module.scss`).
- Follow the BEM naming convention for class names.

### TypeScript

- Use strict typing for all components and functions.
- Define shared types in `src/global.d.ts`.

### Component Design

- Follow a **component-based architecture**.
- Keep components small and focused.
- Place reusable components in `src/components`.

---

## External Dependencies

### Firebase

- Used for authentication and Firestore database.
- Configuration is in `src/firebase/config.ts`.

### Vercel

- Deployment platform. Ensure builds are optimized for production.

---

## Examples

### Adding a New Component

1. Create a new folder in `src/components`.
2. Add the component file (e.g., `NewComponent.tsx`) and a corresponding SCSS module (e.g., `NewComponent.module.scss`).
3. Export the component and integrate it into the relevant page or parent component.

### Fetching Data

Use the `src/api/routes.tsx` file to define API routes and fetch data from Firebase Firestore.

---

For any questions or clarifications, refer to the `README.md` or contact the repository owner.

Happy coding! 🚀
