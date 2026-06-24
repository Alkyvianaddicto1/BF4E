from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import hashlib
import re

# Initialize the FastAPI app
app = FastAPI(title="Quiz Link Shortener")

# Allow your React app to talk to this Python server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://bf4e.vercel.app"],  # In production, change to your actual frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# 1. DATABASE SETUP (Local SQLite file)
# ==========================================
def init_db():
    conn = sqlite3.connect("links.db")
    c = conn.cursor()
    # Create a table to map short hashes to the long Base64 strings
    c.execute('''CREATE TABLE IF NOT EXISTS shortened_links
                 (hash_id TEXT PRIMARY KEY, creator_name TEXT, encoded_data TEXT)''')
    conn.commit()
    conn.close()

init_db()

# ==========================================
# 2. DATA MODELS
# ==========================================
class ShortenRequest(BaseModel):
    creator_name: str
    encoded_data: str  # The massive Base64 string from your React app

# ==========================================
# 3. ENDPOINTS
# ==========================================

@app.post("/api/shorten")
def shorten_link(req: ShortenRequest):
    """
    Takes the long Base64 string, creates a short 8-character hash, 
    saves it to the database, and returns the short path.
    """
    # Create a unique, deterministic 8-character hash from the base64 string
    hash_obj = hashlib.sha256(req.encoded_data.encode('utf-8'))
    short_hash = hash_obj.hexdigest()[:8]
    
    # Strip spaces and special characters from the creator's name for a clean URL
    safe_creator = re.sub(r'[^a-zA-Z0-9]', '', req.creator_name)
    if not safe_creator:
        safe_creator = "Quiz"
        
    # Save to database
    conn = sqlite3.connect("links.db")
    c = conn.cursor()
    c.execute("INSERT OR IGNORE INTO shortened_links (hash_id, creator_name, encoded_data) VALUES (?, ?, ?)",
              (short_hash, safe_creator, req.encoded_data))
    conn.commit()
    conn.close()
    
    # Return the clean URL structure you requested!
    return {
        "short_path": f"/{safe_creator}/{short_hash}"
    }

@app.get("/{creator}/{hash_id}")
def redirect_to_quiz(creator: str, hash_id: str):
    """
    When a friend clicks the short link (e.g., domain.com/Alex/a1b2c3d4),
    this endpoint looks up 'a1b2c3d4', finds the long Base64 string, 
    and redirects them to the React frontend.
    """
    conn = sqlite3.connect("links.db")
    c = conn.cursor()
    c.execute("SELECT encoded_data FROM shortened_links WHERE hash_id = ?", (hash_id,))
    result = c.fetchone()
    conn.close()
    
    if result:
        encoded_data = result[0]
        # REPLACE THIS with your actual React app's domain (e.g., https://myquiz.vercel.app)
        frontend_base_url = "https://bf4e.vercel.app" 
        
        # Redirect the user to the frontend with the databaseless payload attached
        return RedirectResponse(url=f"{frontend_base_url}/?quiz={encoded_data}")
    
    raise HTTPException(status_code=404, detail="Quiz link not found or expired")

# To run this server locally:
# pip install fastapi uvicorn
# uvicorn src.api.shortener:app --reload --port 8000