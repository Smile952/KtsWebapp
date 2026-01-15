from mistralai import Mistral
from worker.config import MISTRAL_API_KEY, PROMPT
import logging

client = Mistral(api_key=MISTRAL_API_KEY)

async def get_response(
    chat_context: dict
) -> str:
    try:
        user_message = chat_context["user_message"]
        client_full_name = chat_context["user_name"]
        client_chat_history = chat_context["chat_history"]
        client_orders = chat_context["orders"]

        result_prompt = PROMPT + f"""
        \nИстория общения пользователя:
        {chr(10).join(client_chat_history) if client_chat_history else "Истории нет"}
        Заказы пользователя:
        {chr(10).join([f"- тип заказа: {order.type}текстовое описание {order.content} (статус: {order.status})" for order in client_orders]) if client_orders else "Заказов нет"}"""

        messages = [
            {"role": "system", "content": f"{result_prompt} client name: {client_full_name}".strip()},
            {"role": "user", "content": user_message}
        ]
        
        response = await client.chat.complete_async(
            model="mistral-small-2506",
            messages=messages
        )
        
        assistant_reply = response.choices[0].message.content

        return assistant_reply

    except Exception as e:
        logging.error(f"Mistral API error: {e}")
        return "Извини, сейчас не могу ответить. Попробуй позже."