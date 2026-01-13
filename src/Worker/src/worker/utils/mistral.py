from mistralai import Mistral
from config import MISTRAL_API_KEY, PROMPT
import logging

client = Mistral(api_key=MISTRAL_API_KEY)

async def get_response(
    user_message: str,
    client_full_name: str
) -> str:
    try:
        

        messages = [
            {"role": "system", "content": f"{PROMPT} {client_full_name}".strip()}
        ]
        messages.append({"role": "user", "content": user_message})
        print("Messages sent to Mistral:", messages)
        response = await client.chat.complete_async(
            model="mistral-small-2506",
            messages=messages
        )
        
        assistant_reply = response.choices[0].message.content

        return assistant_reply

    except Exception as e:
        logging.error(f"Mistral API error: {e}")
        return "Извини, сейчас не могу ответить. Попробуй позже."