from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta
from . import models, auth
from .database import get_db_cursor
from .config import settings

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Trong production nên giới hạn origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.post("/register", response_model=models.User)
async def register(user: models.UserCreate):
    with get_db_cursor() as cursor:
        # Kiểm tra email đã tồn tại
        cursor.execute("SELECT id FROM users WHERE email = %s", (user.email,))
        if cursor.fetchone():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        # Kiểm tra username đã tồn tại
        cursor.execute(
            "SELECT id FROM users WHERE username = %s", (user.username,))
        if cursor.fetchone():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )

        # Hash password và tạo user mới
        hashed_password = auth.get_password_hash(user.password)
        cursor.execute("""
            INSERT INTO users (username, email, password, full_name)
            VALUES (%s, %s, %s, %s)
            RETURNING id, username, email, full_name, avatar_url, created_at, updated_at
        """, (user.username, user.email, hashed_password, user.full_name))

        new_user = cursor.fetchone()
        return dict(new_user)


@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    with get_db_cursor() as cursor:
        cursor.execute(
            "SELECT * FROM users WHERE email = %s",
            (form_data.username,)
        )
        user = cursor.fetchone()

        if not user or not auth.verify_password(form_data.password, user["password"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        access_token_expires = timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = auth.create_access_token(
            data={"sub": user["email"]},
            expires_delta=access_token_expires
        )

        # Trả về cả thông tin user và token
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user["id"],
                "username": user["username"],
                "email": user["email"],
                "full_name": user["full_name"],
                "avatar_url": user["avatar_url"],
            }
        }


@app.get("/users/me", response_model=models.User)
async def read_users_me(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    token_data = auth.verify_token(token, credentials_exception)

    with get_db_cursor() as cursor:
        cursor.execute(
            "SELECT id, username, email, full_name, avatar_url, created_at, updated_at FROM users WHERE email = %s",
            (token_data.email,)
        )
        user = cursor.fetchone()

        if user is None:
            raise credentials_exception

        return dict(user)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
