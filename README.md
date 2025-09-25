# VidSync-Frontend

> A frontend application developed with React, TypeScript, and Vite, offering real-time video synchronization and chat features.

## About the Project

VidSync is a platform where users can watch videos together and chat simultaneously. It includes features such as real-time communication with SignalR, user management, room creation, and secure login/signup.

## Main Features

- User registration and login
- Room creation and management
- Real-time video synchronization (SignalR)
- Chat
- Protected routes
- Modern and responsive UI

## Installation

```bash
git clone https://github.com/EnesEfeTokta/VidSync-Frontend.git
cd VidSync-Frontend
npm install
```

## Getting Started

```bash
npm run dev
```

By default, the application runs at `http://localhost:5173`.

## Folder Structure

```text
src/
  api/                # API requests
  assets/             # Static files
  components/         # Common components
  context/            # React context files
  features/           # Feature-based modules
    auth/             # Authentication
    room/             # Room management
  hooks/              # Custom React hooks
  pages/              # Page components
  router/             # Routing and protected routes
  services/           # Services (auth, room, signalr)
  types/              # TypeScript types
  utils/              # Utility functions
```

## Technologies Used

- React
- TypeScript
- Vite
- SignalR
- ESLint

## Contributing

To contribute, please create a pull request or open an issue.

## License

MIT
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
