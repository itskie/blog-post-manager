from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator
from typing import List
import uuid

app = FastAPI(title="Blog Post Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

posts: List[dict] = []


class PostCreate(BaseModel):
    title: str
    body: str

    @field_validator("title", "body")
    @classmethod
    def must_not_be_blank(cls, v: str, info) -> str:
        if not v or not v.strip():
            raise ValueError(f"{info.field_name} cannot be blank")
        return v.strip()


class Post(BaseModel):
    id: str
    title: str
    body: str


@app.get("/posts", response_model=List[Post])
def get_posts():
    return posts


@app.post("/posts", response_model=Post, status_code=201)
def create_post(post: PostCreate):
    new_post = {
        "id": str(uuid.uuid4()),
        "title": post.title,
        "body": post.body,
    }
    posts.append(new_post)
    return new_post


@app.delete("/posts/{post_id}", status_code=204)
def delete_post(post_id: str):
    for i, post in enumerate(posts):
        if post["id"] == post_id:
            posts.pop(i)
            return
    raise HTTPException(status_code=404, detail="Post not found")
