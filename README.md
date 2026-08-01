# Task Tracker

Task Tracker adalah aplikasi sederhana untuk mengelola daftar tugas (Task Management).

---

## Tech Stack
- **Frontend** : React 19, TypeScript, Vite, Tailwind CSS v4, Axios
- **Backend** : FastAPI, SQLAlchemy, PostgreSQL, Pydantic v2, Uvicorn
- **Database**: PostgreSQL 17
- **Tools** : Dockere, Docker Compose

---

# Struktur Project

```
task-tracker/
│
├── backend/
│   ├── app/
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── routers/
│   │       └── tasks.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── taskapi.ts
│   │   ├── components/
│   │   ├── types/
│   │   │   └── task.ts
│   │   ├── assets/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   └── .env.example
│
├── docker-compose.yml
└── README.md
```

---

# Menjalankan Project (Manual)

## 1. Backend

Masuk ke folder backend

```bash
cd backend
```

Buat virtual environment

```bash
python3 -m venv venv
```

Aktifkan virtual environment

Mac / Linux

```bash
source venv/bin/activate
```

Windows

```bash
venv\Scripts\activate
```

Install dependency

```bash
pip install -r requirements.txt
```

Copy file environment

```bash
cp .env.example .env
```

Isi nilai `DATABASE_URL`.

Contoh

```text
DATABASE_URL=postgresql://username:password@localhost:5432/fridolin_gli_tasktracker
```

Jalankan backend

```bash
uvicorn app.main:app --reload
```

Backend akan berjalan di

```
http://localhost:8000
```

Swagger Documentation

```
http://localhost:8000/docs
```

---

## 2. Frontend

Masuk ke folder frontend

```bash
cd frontend
```

Install dependency

```bash
npm install
```

Copy environment

```bash
cp .env.example .env
```

Isi

```text
VITE_API_URL=http://localhost:8000
```

Jalankan frontend

```bash
npm run dev
```

Frontend berjalan di

```
http://localhost:5173
```

---

# Menjalankan Menggunakan Docker

Pastikan Docker Desktop sudah berjalan.

Dari root project jalankan

```bash
docker compose up --build
```

Docker akan menjalankan:

| Service | Port |
|---------|------|
| PostgreSQL | 5432 |
| Backend | 8000 |
| Frontend | 5173 |

Untuk menghentikan

```bash
docker compose down
```

---

# Environment Variables

## Backend

| Variable | Contoh |
|-----------|---------|
| DATABASE_URL | postgresql://fridoustin:postgres@localhost:5432/fridolin_gli_tasktracker |

---

## Frontend

| Variable | Contoh |
|-----------|---------|
| VITE_API_URL | http://localhost:8000 |

---

# API Endpoint

## GET /tasks

Mengambil seluruh task.

Response

```json
[
  {
    "title": "string",
    "description": "",
    "status": "Todo",
    "id": 1,
    "created_at": "2026-08-01T15:03:10.883Z",
    "updated_at": "2026-08-01T15:03:10.883Z"
  }
]
```

---

## POST /tasks

Menambahkan task baru.

Body

```json
{
  "title": "string",
  "description": "",
  "status": "Todo"
}
```

---

## PUT /tasks/{task_id}

Mengubah task berdasarkan ID.

Body

```json
{
    "status":"Done"
}
```

Mendukung **partial update**, sehingga hanya field yang dikirim yang akan diperbarui.

---

## DELETE /tasks/{task_id}

Menghapus task berdasarkan ID.

---

## GET /tasks/stats

Mengambil statistik jumlah task.

Response

```json
{
    "total":10,
    "todo":3,
    "in_progress":4,
    "done":3
}
```

---


# Tampilan Aplikasi

## Home

![Home](docs/home.png)

# Catatan

- Status task menggunakan enum sehingga hanya menerima nilai `Todo`, `In Progress`, dan `Done`.
- Konfigurasi database dan endpoint API menggunakan environment variable sehingga tidak ada nilai yang di-hardcode.
- Seluruh service dapat dijalankan menggunakan Docker Compose maupun secara manual.