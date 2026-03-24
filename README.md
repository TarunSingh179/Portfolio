# Professional Portfolio 🌟

A truly dynamic, responsive, and advanced personal portfolio website designed to showcase my skills, projects, certifications, and experience. It integrates modern, high-end design principles alongside seamless backend functionality.

## 🚀 Features
- **Immersive User Interface:** Built with React and Framer Motion for incredibly smooth transitions (HeroCanvas, FadeIn, WaveDividers).
- **Comprehensive Sections:** Distinct sections for Hero, About, What I Do, Skills, Projects, Certifications, Internship, and Contact.
- **Micro-Animations:** Interactive hovering effects, custom cursors, and particle backgrounds that elevate user engagement.
- **Backend Integration:** Fast API endpoints provided by a Python minimal backend structure.
- **Theme Management:** Fully supported dynamic dark and light themes (ThemeContext).
- **Responsive Layouts:** Impeccable formatting on mobile, tablet, and ultra-wide screens using Tailwind utility classes.

## 💻 Tech Stack
- **Frontend Framework:** React.js, Tailwind CSS
- **Animations:** Framer Motion, GSAP, CSS Animations
- **Backend Framework:** Python (FastAPI/Flask minimal setup)
- **Database Layer:** Backend configured with SQLAlchemy data models.

## 🛠️ Installation & Setup

### Frontend Setup
1. Open a new terminal and change into the `portfolio-frontend` directory.
   ```bash
   cd portfolio-frontend
   ```
2. Install the required Node packages:
   ```bash
   npm install
   ```
3. Run the development server to view the UI live:
   ```bash
   npm start
   ```

### Backend Setup
1. Change into the `portfolio-backend` directory.
   ```bash
   cd portfolio-backend
   ```
2. Install the necessary Python packages using pip:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the Python local server to initialize endpoints and database connections:
   ```bash
   start_backend.bat  # On Windows
   ```

## 📁 Key Directories
- `portfolio-frontend/src/components/`: Houses all section logic (Hero, Skills, Projects) and advanced UI features (HoverLinks, Canvas).
- `portfolio-backend/app/routes/`: Manages all logic corresponding to different data tables.
- `portfolio-backend/app/models/`: Holds the ORM classes for database interaction.
