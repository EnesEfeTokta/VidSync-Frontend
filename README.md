<div align="center">
  <h1>🎥 VidSync Frontend</h1>
  <p><strong>Real-time Video Conferencing & Collaboration Platform</strong></p>
  
  [![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?logo=vite)](https://vitejs.dev/)
  [![License](https://img.shields.io/badge/License-GPL--3.0-green)](LICENSE)
</div>

---

> **⚠️ IMPORTANT SETUP REQUIREMENTS:**
> 
> Before running this project, you must:
> 1. **Copy SSL certificates** (`.pem` files) from the VidSync-Backend project to this project's root directory
> 2. **Create and configure** the `.env` file with required environment variables
> 
> See the [Configuration](#️-configuration) section for detailed instructions.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#️-configuration) ⚠️ **Required Setup**
- [Quick Start Checklist](#-quick-start-checklist) ✅
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Key Features Explained](#-key-features-explained)
- [API Integration](#-api-integration)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**VidSync** is a modern, real-time video conferencing and collaboration platform built with React, TypeScript, and Vite. It enables users to create virtual rooms, conduct video/audio calls with WebRTC technology, engage in real-time chat, and collaborate seamlessly with advanced features like meeting summarization and AI-powered chatbot assistance.

The application provides a complete solution for remote communication with features including:
- **Peer-to-peer video/audio calling** using WebRTC
- **Real-time messaging** powered by SignalR
- **Room management** with participant tracking
- **AI chatbot integration** for user assistance
- **Dark/Light theme** support
- **Secure authentication** and authorization

---

## ✨ Features

### 🎬 Video Conferencing
- **WebRTC-based peer-to-peer connections** with STUN/TURN servers
- **Real-time audio/video controls** (mute/unmute, video on/off)
- **Participant management** with live status updates
- **Screen sharing capabilities**
- **Automatic connection recovery**

### 💬 Real-time Communication
- **SignalR-powered instant messaging** within rooms
- **Live participant notifications** (join/leave events)
- **WebRTC signaling** for offer/answer/ICE candidate exchange
- **Chat history** persistence

### 🏠 Room Management
- **Create and join virtual rooms**
- **Room expiration settings**
- **Meeting summarization** (AI-powered meeting notes)
- **Participant list** with real-time updates

### 🔐 Authentication & Security
- **JWT-based authentication**
- **Secure session management**
- **Protected routes** with authentication guards
- **Token refresh** mechanism

### 🎨 User Experience
- **Responsive design** for desktop and mobile
- **Dark/Light theme toggle**
- **AI chatbot assistant** for help and guidance
- **Intuitive dashboard** interface
- **Modern UI** with React Icons and Lucide React

### 📊 Additional Pages
- **Landing page** with product overview
- **About page**
- **Pricing plans**
- **FAQ section**
- **Contact form**

---

## 🛠 Tech Stack

### Core Technologies
- **[React 19.1.1](https://reactjs.org/)** - UI library
- **[TypeScript 5.8.3](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite 7.1.2](https://vitejs.dev/)** - Build tool and dev server

### Communication & Real-time
- **[@microsoft/signalr 9.0.6](https://github.com/dotnet/aspnetcore/tree/main/src/SignalR)** - Real-time communication
- **WebRTC** - Peer-to-peer video/audio streaming
- **[Axios 1.13.1](https://axios-http.com/)** - HTTP client

### Routing & State
- **[React Router DOM 7.9.4](https://reactrouter.com/)** - Client-side routing
- **React Context API** - Global state management

### UI & Styling
- **CSS Modules** - Component-scoped styling
- **[React Icons 5.5.0](https://react-icons.github.io/react-icons/)** - Icon library
- **[Lucide React 0.546.0](https://lucide.dev/)** - Modern icon set

### Development Tools
- **[ESLint 9.33.0](https://eslint.org/)** - Code linting
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript linting rules
- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)** - Fast Refresh with SWC

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0 or higher recommended)
- **npm** or **yarn** package manager
- **Git** for version control

### Required Files from VidSync-Backend
⚠️ **Critical:** You must have access to the **VidSync-Backend** project to obtain:
- SSL certificate files (`localhost+3.pem` and `localhost+3-key.pem`)
- These files are generated in the backend project and must be copied to this frontend project

### Optional: mkcert (for generating new certificates)
If you need to generate new SSL certificates for local development:
  ```bash
  # Install mkcert (macOS)
  brew install mkcert
  
  # Install mkcert (Windows with Chocolatey)
  choco install mkcert
  
  # Generate local certificates
  mkcert localhost 127.0.0.1 ::1
  ```

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/EnesEfeTokta/VidSync-Frontend.git
cd VidSync-Frontend
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. SSL Certificate Setup (Required)

#### Important: Copy SSL Certificates from Backend Project
This project requires HTTPS to function properly (WebRTC requirement). You must copy the SSL certificate files generated in the **VidSync-Backend** project to this project's root directory.

**Required files:**
- `localhost+3.pem`
- `localhost+3-key.pem`

**Steps:**
1. Locate the `.pem` certificate files in your VidSync-Backend project directory
2. Copy both files to the root directory of this VidSync-Frontend project
3. Ensure the files are in the same directory as `package.json` and `vite.config.ts`

⚠️ **Without these certificate files, the application will not start!**

#### Alternative: Generate New Certificates (Local Development Only)
If you need to generate new certificates for local development:
```bash
mkcert -install
mkcert localhost
```

This will generate new `localhost+3.pem` and `localhost+3-key.pem` files in your project root.

---

## ⚙️ Configuration

### Environment Variables (Required)

#### Quick Setup:
Copy the example environment file and configure it:
```bash
cp .env.example .env
```

Then edit the `.env` file with your actual values:

```env
VITE_API_URL=https://vidsync-back.enesefetokta.shop

CLOUDFLARE_TUNNEL_TOKEN=your_cloudflare_tunnel_token_here
```

**Environment Variables Explanation:**
- **VITE_API_URL**: Your backend API base URL (must support HTTPS for WebRTC)
  - Production: `https://vidsync-back.enesefetokta.shop`
  - Local development: `https://localhost:5166` (if running backend locally)
  
- **CLOUDFLARE_TUNNEL_TOKEN**: Your Cloudflare Tunnel token for secure connections
  - Get this token from your Cloudflare Tunnel dashboard
  - Required for production deployments

⚠️ **Important:** 
- The `.env` file must be created and properly configured before running the application
- Do not commit your `.env` file to version control (it's already in `.gitignore`)
- Each environment variable is required for the application to function correctly

### SSL Configuration
The project is configured to use HTTPS by default (see `vite.config.ts`). Ensure your certificate files are present in the root directory:
- `localhost+3.pem` (Certificate file)
- `localhost+3-key.pem` (Private key file)

**File locations should be:**
```
VidSync-Frontend/
├── localhost+3.pem          ← SSL Certificate (from Backend)
├── localhost+3-key.pem      ← SSL Private Key (from Backend)
├── .env                     ← Environment variables (create this)
├── .env.example             ← Environment template
├── package.json
├── vite.config.ts
└── ...
```

---

## 🚀 Quick Start Checklist

Before running the application, complete these steps:

- [ ] **Clone the repository**
- [ ] **Install dependencies** (`npm install`)
- [ ] **Copy SSL certificates** from VidSync-Backend project
  - [ ] `localhost+3.pem` 
  - [ ] `localhost+3-key.pem`
- [ ] **Create .env file** (`cp .env.example .env`)
- [ ] **Configure environment variables** in `.env`
  - [ ] Set `VITE_API_URL`
  - [ ] Set `CLOUDFLARE_TUNNEL_TOKEN`
- [ ] **Start development server** (`npm run dev`)

✅ Once all items are checked, you're ready to use VidSync!

---

## 🎯 Usage

### Development Mode
Start the development server with hot module replacement:
```bash
npm run dev
# or
npm run dev:network  # Accessible from other devices on your network
```

The application will be available at `https://localhost:5173`

### Build for Production
```bash
npm run build
```
This generates optimized production files in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

---

## 📁 Project Structure

```text
VidSync-Frontend/
├── public/                      # Static assets
│   └── vite.svg
├── src/
│   ├── api/                     # API configuration
│   │   └── api.ts
│   ├── assets/                  # Images, fonts, etc.
│   │   └── react.svg
│   ├── components/              # Reusable UI components
│   │   ├── ChatBot/            # AI chatbot widget
│   │   │   ├── ChatBotWidget.tsx
│   │   │   └── ChatBotWindow.tsx
│   │   ├── ChatWindow.tsx       # Room chat component
│   │   ├── Footer.tsx           # Footer component
│   │   ├── Header.tsx           # Navigation header
│   │   ├── LoginForm.tsx        # Login form
│   │   ├── ParticipantList.tsx # Room participant list
│   │   ├── RegisterForm.tsx     # Registration form
│   │   ├── ThemeToggleButton.tsx
│   │   └── VideoPlayer.tsx      # WebRTC video player
│   ├── context/                 # React Context providers
│   │   ├── AuthContext.tsx      # Authentication state
│   │   └── ThemeContext.tsx     # Theme state (dark/light)
│   ├── pages/                   # Page components
│   │   ├── AboutPage/
│   │   ├── ContactPage/
│   │   ├── DashboardPage/       # Main dashboard
│   │   ├── FAQPage/
│   │   ├── HomePage/            # Landing page
│   │   ├── LoginPage/
│   │   ├── PricingPage/
│   │   ├── RegisterPage/
│   │   └── RoomPage/            # Video conference room
│   ├── router/                  # Routing configuration
│   │   └── ProtectedRoute.tsx   # Auth-protected routes
│   ├── services/                # Business logic & API services
│   │   ├── api.ts              # API client configuration
│   │   ├── authService.ts      # Authentication API
│   │   ├── roomService.ts      # Room management API
│   │   ├── signalrService.ts   # SignalR real-time service
│   │   └── webRtcService.ts    # WebRTC peer connection
│   ├── types/                   # TypeScript type definitions
│   │   ├── AuthContextType.ts
│   │   ├── AuthResponse.ts
│   │   ├── ChatBotMessage.ts
│   │   ├── ChatMessage.ts
│   │   ├── CreateRoomPayload.ts
│   │   ├── LoginData.ts
│   │   ├── Participant.ts
│   │   ├── RegisterData.ts
│   │   ├── Room.ts
│   │   └── User.ts
│   ├── utils/                   # Utility functions
│   ├── App.tsx                  # Main app component
│   ├── App.css                  # Global styles
│   ├── main.tsx                 # Application entry point
│   ├── index.css                # Base CSS
│   └── vite-env.d.ts           # Vite environment types
├── .gitignore
├── CHANGELOG.md
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point
├── LICENSE                     # GPL-3.0 License
├── package.json                # Dependencies & scripts
├── README.md                   # This file
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts             # Vite configuration
```

---

## 🔑 Key Features Explained

### WebRTC Video Conferencing
The application uses the **webRtcService** (`src/services/webRtcService.ts`) to manage peer-to-peer connections:

1. **Local Stream Initialization**: Captures user's camera and microphone
2. **Peer Connection Setup**: Creates RTCPeerConnection with STUN/TURN servers
3. **Offer/Answer Exchange**: Negotiates connection through SignalR signaling
4. **ICE Candidate Exchange**: Establishes optimal network path
5. **Stream Rendering**: Displays local and remote video feeds

### SignalR Real-time Communication
The **signalrService** (`src/services/signalrService.ts`) handles:
- WebSocket connection management
- Room event subscriptions (UserJoined, UserLeft, etc.)
- WebRTC signaling (SendOffer, SendAnswer, SendIceCandidate)
- Chat message broadcasting
- Automatic reconnection

### Authentication Flow
1. User registers/logs in via **authService**
2. JWT token stored in localStorage
3. Token included in all API requests (axios interceptor)
4. **AuthContext** provides user state globally
5. **ProtectedRoute** guards authenticated pages

### Theme Management
- **ThemeContext** stores current theme (light/dark)
- Persists preference in localStorage
- Respects system theme preference as fallback
- CSS variables for dynamic theming

---

## 🔌 API Integration

### Base URL Configuration
Set your backend API URL in `.env`:
```env
VITE_API_URL=https://your-backend-url.com
```

### API Endpoints Used

#### Authentication (`/api/auth`)
- `POST /login` - User login
- `POST /register` - User registration
- `GET /me` - Get current user info

#### Rooms (`/api/rooms`)
- `POST /rooms` - Create new room
- `POST /rooms/:roomId/summarize` - Generate meeting summary

#### SignalR Hub (`/communicationhub`)
- WebSocket connection for real-time events
- Automatic reconnection on failure

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Coding Standards
- Follow TypeScript best practices
- Use ESLint configuration
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

---

## 📄 License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Enes Efe Tokta** - [@EnesEfeTokta](https://github.com/EnesEfeTokta)

---

## 🙏 Acknowledgments

- [React Team](https://reactjs.org/) - For the amazing React library
- [Microsoft SignalR](https://github.com/dotnet/aspnetcore) - For real-time communication
- [Vite Team](https://vitejs.dev/) - For the blazing fast build tool
- [WebRTC Community](https://webrtc.org/) - For making peer-to-peer possible

---

<div align="center">
  <p>Made with ❤️ by the VidSync Team</p>
  <p>⭐ Star us on GitHub if you find this project useful!</p>
</div>
