from dotenv import load_dotenv
import os

load_dotenv()

MISTRAL_API_KEY = os.getenv("API_KEY")
PROMPT = os.getenv("PROMPT")