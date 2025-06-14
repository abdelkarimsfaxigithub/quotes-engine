# 🧠 Quotes Engine

**Quotes Engine** is a full-stack web application designed to manage, display, and organize quotes. It is built with a modern architecture using **Django** (Python) for the backend and **React** for the frontend, fully containerized with **Docker**.

## 📁 Project Structure

quotes-engine/
├── backend/ # Django REST API
│ ├── manage.py
│ └── quotes/ # Main app
│ └── Dockerfile
├── frontend/ # React application
│ ├── src/
│ └── public/
│ └── Dockerfile
├── docker-compose.yml # Compose file (root level)
└── README.md # This file


## 🚀 Installation & Launch

### Requirements

- Docker & Docker Compose installed

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/abdelkarimsfaxigithub/quotes-engine.git
cd quotes-engine

# 3. Launch the application (backend + frontend)
docker-compose up --build

```

Frontend: http://localhost

Backend API: http://localhost:8000/api/

Django Admin: http://localhost:8000/admin/

Username: admin

Password: adminpass

# 🎬 Demo
You can watch a demonstration video of the app’s features here: Demo [Video Link]()

# ⚙️ Technologies Used

### Backend – Django
Django 4+

Django REST Framework

SQLite3 database

JWT authentication

Django admin enabled

Unit testing with pytest

Code formatting with Black

### Frontend – React
React 18 + Vite

Axios for API requests

Tailwind CSS (or other UI library)

React Router

ESLint + Prettier

### DevOps
Docker & Docker Compose

.env for secure config

Git for version control

# 📘 Documentation
API
All routes available under /api/quotes

Admin panel available for content management

Features
Full CRUD for quotes

Filter quotes by author, theme, or keyword

User authentication

Modern and responsive UI

# 📄 License
This project is licensed under the MIT License.


# 🙋 Contact
Lead Developer: Abdelkarim SFAXI
📧 Email: abdelkarim.sfaxi@example.com
💻 GitHub: https://github.com/abdelkarimsfaxigithub