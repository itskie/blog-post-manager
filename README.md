# Blog Post Manager

A full-stack mini blog app built for the MyPustak Full Stack Developer assignment.

- **Backend:** FastAPI (Python) — in-memory storage, REST API
- **Frontend:** React + Vite + TypeScript + TailwindCSS

---

## Project Structure

```
blog-post-manager/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreatePostForm.tsx
│   │   │   └── PostCard.tsx
│   │   ├── api.ts
│   │   ├── types.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

---

## Backend Setup

**Requirements:** Python 3.9+

```bash
cd backend

# Create and activate a virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate      # macOS/Linux
# venv\Scripts\activate       # Windows

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | Return all posts |
| POST | `/posts` | Create a new post |
| DELETE | `/posts/{id}` | Delete a post by ID |

### Example Requests

```bash
# Get all posts
curl http://localhost:8000/posts

# Create a post
curl -X POST http://localhost:8000/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "Hello World", "body": "My first post"}'

# Delete a post
curl -X DELETE http://localhost:8000/posts/<id>
```

---

## Frontend Setup

**Requirements:** Node.js 18+

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

> Make sure the backend is running before starting the frontend.

---

## Features

- View all posts with title and body
- Create new posts with form validation
- Delete any post
- Loading skeleton while fetching
- Error messages on API failures
- TypeScript throughout
- TailwindCSS styling
