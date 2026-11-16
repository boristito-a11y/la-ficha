# La Ficha · Tienda de juegos de mesa

Catálogo de productos con React + Vite + Tailwind CSS + shadcn/ui (frontend) y Django REST Framework (backend).

## Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata datos_iniciales
python manage.py runserver

## Frontend
cd frontend
npm install
npm run dev