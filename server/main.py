from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
import os
from datetime import datetime

UPLOAD_DIR = "uploaded_images"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImageData(BaseModel):
    image: str
    type: str
    image_id: str

@app.post("/upload-image/")
async def upload_image(data: ImageData):
    try:
        image_data = base64.b64decode(data.image)
        image_filename = os.path.join(UPLOAD_DIR, f"{data.image_id}_{data.type}.png")
        with open(image_filename, "wb") as f:
            f.write(image_data)

        return {"message": f"{data.type.capitalize()} image uploaded successfully.", "image_path": image_filename}

    except base64.binascii.Error:
        raise HTTPException(status_code=400, detail="Invalid base64 encoding.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Hello Image"}