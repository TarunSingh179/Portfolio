# Professional Portfolio 🌟

A highly dynamic, extremely interactive, and premium immersive personal portfolio website. This project merges cutting-edge frontend web technologies (3D rendering and micro-animations) with a robust asynchronous Python backend and a NoSQL database system to manage content dynamically.

## 🚀 Key Features

- **3D Interactive Elements:** Uses `@react-three/fiber` and `@react-three/drei` for rendering beautiful 3D canvases seamlessly in the browser.
- **Complex UI Animations:** Orchestrated via `framer-motion` and `gsap` for incredibly smooth scrolling, cursor effects, wave dividers, and layout transitions.
- **Dynamic Marquees & Typing:** Integrates `react-fast-marquee` and `react-type-animation` for continuous content streams and hero text effects.
- **Comprehensive API Management:** A fully featured FastAPI backend with structured routers (Auth, Projects, Skills, Education, Certifications, Internships, Contacts, and AI features).
- **Asynchronous Database:** Connects to MongoDB asynchronously for fast document retrieval and content updates.
- **CORS & Static Handling:** Robust middleware routing for file uploads and cross-origin resource sharing configured directly in FastAPI.

## 💻 Tech Stack

- **Frontend Core:** React.js (v18), React Router
- **3D & Animation:** Three.js, React Three Fiber, Framer Motion, GSAP
- **Styling:** Tailwind CSS, PostCSS
- **Backend Framework:** FastAPI (Python 3.x)
- **Database:** MongoDB (Asynchronous motor integration)

## 📁 Source Configuration

- `portfolio-frontend/src/`: Contains immersive components (`HeroCanvas.jsx`, `Cursor.jsx`, `ThemeContext.jsx`) and section layouts.
- `portfolio-backend/app/main.py`: The entry point for the FastAPI server mounting endpoints and static directories.
- `portfolio-backend/app/routes/`: Categorized endpoint handlers for separating operational concerns.
- `portfolio-backend/app/models/`: NoSQL schemas and validation logics.

## 🛠️ Installation & Setup

### Database

- Ensure you have a running MongoDB instance locally or in the cloud. Check `portfolio-backend/.env` for connection configurations.

### Backend Setup

```bash
cd portfolio-backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

*The FastAPI server mounts on <http://localhost:8000> and serves interactive docs at `/docs`.*

### Frontend Setup

```bash
cd portfolio-frontend
npm install
npm start
```

*The React development server runs automatically on <http://localhost:3000>.* (Note: It automatically proxies to backend port 8000).
