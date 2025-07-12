from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import Optional
import os
import datetime
from openai import OpenAI
from textblob import TextBlob
import speech_recognition as sr
import tempfile
import io
from gtts import gTTS
import base64
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

router = APIRouter()

# OpenRouter client configuration
# Get API key from environment variable for security
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

if not OPENROUTER_API_KEY:
    raise ValueError("OPENROUTER_API_KEY not found in environment variables. Please check your .env file.")

if OPENROUTER_API_KEY == "sk-or-v1-your-openrouter-key-here":
    raise ValueError("Please replace the placeholder API key in your .env file with your actual OpenRouter API key from https://openrouter.ai/keys")

if not OPENROUTER_API_KEY.startswith("sk-or-v1-"):
    raise ValueError("Invalid OpenRouter API key format. The key should start with 'sk-or-v1-'. Please check your .env file.")

print(f"OpenRouter API key loaded: {OPENROUTER_API_KEY[:20]}..." + "*" * 20)  # Debug info (safe partial key display)

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
)

# System prompt
SYSTEM_PROMPT = """
You are ReWearBot, the friendly AI assistant for the ReWear platform — a community-powered 
clothing exchange app.
Your role is to:
- Help users upload and list clothing
- Suggest relevant clothing swaps
- Explain how point-based redemptions work
- Encourage eco-conscious behavior
- Ensure all exchanges are respectful, inclusive, and transparent

Also:
- Promote sustainability by explaining the environmental impact of reusing clothes
- Help users track their activity: swaps done, points earned, and items listed
- When asked to explain processes, use text-based ASCII flowcharts
- Politely avoid topics outside of clothing exchange and sustainability
- Never store or ask for private information

Current date: {current_date}
"""

class ChatRequest(BaseModel):
    message: str
    conversation_history: list = []

class ChatResponse(BaseModel):
    response: str
    audio_base64: Optional[str] = None
    sentiment: str

class ReWearBot:
    def __init__(self):
        self.conversation_history = []
        self.initialize_conversation()

    def initialize_conversation(self):
        current_date = datetime.datetime.now().strftime("%B %d, %Y")
        self.conversation_history = [
            {"role": "system", "content": SYSTEM_PROMPT.format(current_date=current_date)}
        ]

    def get_response(self, user_input, conversation_history=None):
        # Use provided conversation history or default
        if conversation_history:
            messages = [{"role": "system", "content": SYSTEM_PROMPT.format(current_date=datetime.datetime.now().strftime("%B %d, %Y"))}] + conversation_history
        else:
            messages = self.conversation_history + [{"role": "user", "content": user_input}]
        
        try:
            response = client.chat.completions.create(
                model="google/gemini-2.5-flash-preview-04-17",
                messages=messages,
                temperature=0.7,
                max_tokens=1024,
            )
            ai_message = response.choices[0].message.content
            return ai_message if ai_message else "Sorry, I couldn't generate a response."
        except Exception as e:
            return f"Sorry, I'm having trouble connecting right now. Error: {str(e)}"

def get_sentiment(text):
    blob = TextBlob(text)
    sentiment = blob.sentiment.polarity
    if sentiment > 0.1:
        return "positive"
    elif sentiment < -0.1:
        return "negative"
    else:
        return "neutral"

def text_to_audio_base64(text, lang="en"):
    """Convert text to audio and return as base64 string"""
    try:
        tts = gTTS(text=text, lang=lang)
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
            tts.save(temp_file.name)
            with open(temp_file.name, "rb") as f:
                audio_data = f.read()
            os.unlink(temp_file.name)
        return base64.b64encode(audio_data).decode('utf-8')
    except Exception as e:
        print(f"Audio generation failed: {e}")
        return None

def speech_to_text(audio_file):
    """Convert speech to text using speech recognition"""
    try:
        recognizer = sr.Recognizer()
        
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:
            temp_file.write(audio_file.file.read())
            temp_file_path = temp_file.name
        
        with sr.AudioFile(temp_file_path) as source:
            audio = recognizer.record(source)
            text = recognizer.recognize_google(audio)
        
        os.unlink(temp_file_path)
        return text
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Speech recognition failed: {str(e)}")

@router.post("/chat", response_model=ChatResponse)
async def chat_with_bot(request: ChatRequest):
    """Handle text-based chat requests"""
    try:
        bot = ReWearBot()
        
        # Get sentiment
        sentiment = get_sentiment(request.message)
        
        # Get bot response
        response = bot.get_response(request.message, request.conversation_history)
        
        # Generate audio
        audio_base64 = text_to_audio_base64(response)
        
        return ChatResponse(
            response=response,
            audio_base64=audio_base64,
            sentiment=sentiment
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat processing failed: {str(e)}")

@router.post("/voice-chat", response_model=ChatResponse)
async def voice_chat_with_bot(audio_file: UploadFile = File(...)):
    """Handle voice-based chat requests"""
    try:
        # Convert speech to text
        user_message = speech_to_text(audio_file)
        
        # Get sentiment
        sentiment = get_sentiment(user_message)
        
        # Get bot response
        bot = ReWearBot()
        response = bot.get_response(user_message)
        
        # Generate audio response
        audio_base64 = text_to_audio_base64(response)
        
        return ChatResponse(
            response=response,
            audio_base64=audio_base64,
            sentiment=sentiment
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Voice chat processing failed: {str(e)}")

@router.get("/health")
async def chatbot_health():
    """Health check endpoint for the chatbot"""
    return {"status": "healthy", "service": "ReWearBot"} 