import { CheatSheet } from "@/types/cheatsheet";

export const fastapiCheatSheet: CheatSheet = {
  title: "FastAPI Cheat Sheet",
  description:
    "Modern Python web framework • Fast • Type hints • Automatic docs • Async support • Dependency injection • Best practices",
  sections: [
    {
      id: "quick-start",
      title: "Quick Start & Setup",
      description:
        "Install FastAPI • Create your first app • Run development server",
      examples: [
        {
          title: "Installation & Basic App",
          description:
            "Install FastAPI and Uvicorn • Create minimal working application",
          language: "python",
          difficulty: "beginner",
          tags: ["setup", "basics", "installation", "getting-started"],
          code: `# Installation
# pip install fastapi uvicorn[standard]

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}

# Run with: uvicorn main:app --reload
# Visit: http://localhost:8000
# Docs: http://localhost:8000/docs`,
        },
        {
          title: "Application Configuration",
          description:
            "Configure FastAPI with metadata • Custom OpenAPI docs • CORS setup",
          language: "python",
          difficulty: "intermediate",
          tags: ["configuration", "cors", "middleware", "setup"],
          code: `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="My API",
    description="API for managing items",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production: specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)`,
        },
      ],
    },
    {
      id: "path-operations",
      title: "Path Operations & Parameters",
      description:
        "HTTP methods • Path parameters • Query parameters • Request body",
      examples: [
        {
          title: "HTTP Methods (GET, POST, PUT, DELETE)",
          description:
            "Define endpoints for CRUD operations • Type-safe parameters",
          language: "python",
          code: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    description: str | None = None

# GET - Read
@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

# POST - Create
@app.post("/items/")
async def create_item(item: Item):
    return {"name": item.name, "price": item.price}

# PUT - Update
@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item):
    return {"item_id": item_id, "item": item}

# DELETE - Delete
@app.delete("/items/{item_id}")
async def delete_item(item_id: int):
    return {"deleted": item_id}`,
        },
        {
          title: "Path and Query Parameters",
          description:
            "Extract parameters from URL • Optional and required parameters • Type validation",
          language: "python",
          code: `from fastapi import FastAPI, Query
from typing import Annotated

app = FastAPI()

# Path parameter with type
@app.get("/users/{user_id}")
async def read_user(user_id: int):
    return {"user_id": user_id}

# Query parameters
@app.get("/items/")
async def read_items(
    skip: int = 0,
    limit: int = 10,
    q: str | None = None
):
    return {"skip": skip, "limit": limit, "q": q}

# Query parameter validation with Query
@app.get("/search/")
async def search(
    q: Annotated[str, Query(
        min_length=3,
        max_length=50,
        pattern="^[a-zA-Z0-9 ]+$"
    )]
):
    return {"query": q}

# Multiple path parameters
@app.get("/users/{user_id}/items/{item_id}")
async def read_user_item(user_id: int, item_id: int):
    return {"user_id": user_id, "item_id": item_id}`,
        },
      ],
    },
    {
      id: "request-validation",
      title: "Request Validation with Pydantic",
      description:
        "Define request models • Field validation • Custom validators • Nested models",
      examples: [
        {
          title: "Pydantic Models",
          description:
            "Define request/response schemas • Automatic validation and docs",
          language: "python",
          code: `from fastapi import FastAPI
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime

app = FastAPI()

class User(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    full_name: str | None = None
    age: int = Field(..., ge=0, le=150)
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.now)

@app.post("/users/")
async def create_user(user: User):
    return {
        "username": user.username,
        "email": user.email,
        "age": user.age
    }

# Field constraints:
# min_length, max_length - string length
# ge, gt, le, lt - number comparisons
# regex - pattern matching`,
        },
        {
          title: "Custom Validators",
          description:
            "Add custom validation logic • Field and model validators",
          language: "python",
          code: `from fastapi import FastAPI
from pydantic import BaseModel, field_validator, model_validator

app = FastAPI()

class User(BaseModel):
    username: str
    password: str
    password_confirm: str

    @field_validator('username')
    @classmethod
    def username_alphanumeric(cls, v):
        if not v.isalnum():
            raise ValueError('must be alphanumeric')
        return v

    @field_validator('password')
    @classmethod
    def password_strength(cls, v):
        if len(v) < 8:
            raise ValueError('must be at least 8 characters')
        if not any(c.isupper() for c in v):
            raise ValueError('must contain uppercase')
        return v

    @model_validator(mode='after')
    def passwords_match(self):
        if self.password != self.password_confirm:
            raise ValueError('passwords do not match')
        return self

@app.post("/register/")
async def register(user: User):
    return {"username": user.username}`,
        },
        {
          title: "Nested Models",
          description:
            "Complex data structures • Relationships • List and dict types",
          language: "python",
          code: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Image(BaseModel):
    url: str
    name: str

class Item(BaseModel):
    name: str
    price: float
    tags: list[str] = []
    images: list[Image] = []

class Offer(BaseModel):
    name: str
    items: list[Item]
    metadata: dict[str, str] = {}

@app.post("/offers/")
async def create_offer(offer: Offer):
    return offer

# Example request body:
# {
#   "name": "Special Deal",
#   "items": [
#     {
#       "name": "Item 1",
#       "price": 10.0,
#       "tags": ["new", "sale"],
#       "images": [{"url": "img.jpg", "name": "photo"}]
#     }
#   ]
# }`,
        },
      ],
    },
    {
      id: "response-models",
      title: "Response Models & Status Codes",
      description:
        "Define response schemas • Status codes • Multiple response types",
      examples: [
        {
          title: "Response Model",
          description:
            "Define what API returns • Automatic filtering • Documentation",
          language: "python",
          code: `from fastapi import FastAPI
from pydantic import BaseModel, EmailStr

app = FastAPI()

class UserIn(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    username: str
    email: EmailStr
    # password excluded

@app.post("/users/", response_model=UserOut)
async def create_user(user: UserIn):
    # Password won't be in response
    return user

# Response model excludes sensitive data
# Validates response matches schema
# Auto-generates response documentation`,
        },
        {
          title: "Status Codes",
          description:
            "HTTP status codes • Custom responses • Error handling",
          language: "python",
          code: `from fastapi import FastAPI, status, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.post(
    "/items/",
    status_code=status.HTTP_201_CREATED
)
async def create_item(item: Item):
    return item

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    if item_id not in items_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )
    return items_db[item_id]

# Common status codes:
# 200 OK, 201 Created, 204 No Content
# 400 Bad Request, 401 Unauthorized, 403 Forbidden
# 404 Not Found, 422 Validation Error
# 500 Internal Server Error`,
        },
      ],
    },
    {
      id: "dependency-injection",
      title: "Dependency Injection",
      description:
        "Reusable dependencies • Database connections • Authentication • Shared logic",
      examples: [
        {
          title: "Basic Dependencies",
          description:
            "Create reusable dependencies • Inject into path operations",
          language: "python",
          code: `from fastapi import FastAPI, Depends

app = FastAPI()

async def common_parameters(
    skip: int = 0,
    limit: int = 100,
    q: str | None = None
):
    return {"skip": skip, "limit": limit, "q": q}

@app.get("/items/")
async def read_items(commons: dict = Depends(common_parameters)):
    return commons

@app.get("/users/")
async def read_users(commons: dict = Depends(common_parameters)):
    return commons

# Dependency is called automatically
# Result is injected into function
# Reuse logic across endpoints`,
        },
        {
          title: "Database Dependency",
          description:
            "Inject database sessions • Automatic cleanup • Connection pooling",
          language: "python",
          code: `from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal

app = FastAPI()

def get_db():
    """Database session dependency."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/users/{user_id}")
async def read_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    return user

# yield ensures cleanup happens
# db is automatically provided
# Connection is closed after request`,
        },
      ],
    },
    {
      id: "security",
      title: "Security & Authentication",
      description:
        "OAuth2 • JWT tokens • API keys • Password hashing • Protected routes",
      examples: [
        {
          title: "OAuth2 with JWT",
          description:
            "Token-based authentication • Login endpoint • Protected routes",
          language: "python",
          code: `from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from datetime import datetime, timedelta
import jwt

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

class Token(BaseModel):
    access_token: str
    token_type: str

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Verify credentials (simplified)
    if form_data.username != "user" or form_data.password != "pass":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    access_token = create_access_token({"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401)
        return username
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401)

@app.get("/users/me")
async def read_users_me(current_user: str = Depends(get_current_user)):
    return {"username": current_user}`,
        },
        {
          title: "Password Hashing",
          description:
            "Secure password storage • bcrypt hashing • Verification",
          language: "python",
          code: `from fastapi import FastAPI
from passlib.context import CryptContext
from pydantic import BaseModel

app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(BaseModel):
    username: str
    password: str

def hash_password(password: str) -> str:
    """Hash a password."""
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    """Verify password against hash."""
    return pwd_context.verify(plain, hashed)

@app.post("/register/")
async def register(user: User):
    hashed_pw = hash_password(user.password)
    # Save user with hashed_pw to database
    return {"username": user.username}

# SECURITY: Never store plain passwords
# Use bcrypt, argon2, or scrypt
# Add salt automatically with these libraries`,
        },
      ],
    },
    {
      id: "database",
      title: "Database Integration",
      description:
        "SQLAlchemy ORM • CRUD operations • Async database • Migrations",
      examples: [
        {
          title: "SQLAlchemy Setup",
          description:
            "Configure database • Define models • Create tables",
          language: "python",
          code: `from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Define model
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String)
    hashed_password = Column(String)

# Create tables
Base.metadata.create_all(bind=engine)`,
        },
        {
          title: "CRUD Operations",
          description:
            "Create, Read, Update, Delete with SQLAlchemy • Type-safe queries",
          language: "python",
          code: `from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

app = FastAPI()

# CREATE
@app.post("/users/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(
        email=user.email,
        username=user.username,
        hashed_password=hash_password(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# READ
@app.get("/users/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# UPDATE
@app.put("/users/{user_id}")
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404)
    db_user.username = user.username
    db.commit()
    return db_user

# DELETE
@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404)
    db.delete(db_user)
    db.commit()
    return {"deleted": user_id}`,
        },
      ],
    },
    {
      id: "background-tasks",
      title: "Background Tasks & Files",
      description:
        "Background task processing • File uploads • Async operations",
      examples: [
        {
          title: "Background Tasks",
          description:
            "Execute tasks after returning response • Send emails • Data processing",
          language: "python",
          code: `from fastapi import FastAPI, BackgroundTasks

app = FastAPI()

def send_email(email: str, message: str):
    """Background task to send email."""
    # Simulate sending email
    print(f"Sending email to {email}: {message}")

@app.post("/send-notification/")
async def send_notification(
    email: str,
    background_tasks: BackgroundTasks
):
    background_tasks.add_task(send_email, email, "Thanks for signing up!")
    return {"message": "Notification will be sent"}

# Task runs after response is sent
# Non-blocking for the client
# Use for emails, logging, cleanup`,
        },
        {
          title: "File Upload",
          description:
            "Handle file uploads • Validate file types • Save files",
          language: "python",
          code: `from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.post("/files/")
async def create_file(file: bytes = File()):
    """Upload file as bytes."""
    return {"file_size": len(file)}

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    """Upload with metadata."""
    contents = await file.read()
    
    # Save file
    with open(f"uploads/{file.filename}", "wb") as f:
        f.write(contents)
    
    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "size": len(contents)
    }

@app.post("/multiple-files/")
async def create_files(files: list[UploadFile]):
    """Upload multiple files."""
    return {"filenames": [f.filename for f in files]}

# UploadFile is memory efficient (spooled)
# Access metadata: filename, content_type
# Validate file types before processing`,
        },
      ],
    },
    {
      id: "advanced",
      title: "Advanced Features",
      description:
        "WebSockets • Middleware • Testing • Deployment strategies",
      examples: [
        {
          title: "WebSockets",
          description:
            "Real-time bidirectional communication • Chat applications • Live updates",
          language: "python",
          code: `from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Message: {data}")
    except:
        await websocket.close()

# Client usage:
# const ws = new WebSocket("ws://localhost:8000/ws");
# ws.onmessage = (event) => console.log(event.data);
# ws.send("Hello");`,
        },
        {
          title: "Custom Middleware",
          description:
            "Process requests/responses • Add headers • Logging • Timing",
          language: "python",
          code: `from fastapi import FastAPI, Request
import time

app = FastAPI()

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

# Middleware runs for every request
# Useful for logging, metrics, auth
# Can modify request and response`,
        },
        {
          title: "Testing with pytest",
          description:
            "Test FastAPI endpoints • Test client • Fixtures",
          language: "python",
          code: `# test_main.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

def test_create_item():
    response = client.post(
        "/items/",
        json={"name": "Test", "price": 10.0}
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Test"

# Run with: pytest
# TestClient doesn't require running server
# Use fixtures for database setup`,
        },
      ],
    },
  ],
};
