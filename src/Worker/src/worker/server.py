import asyncio
from concurrent import futures
from grpc import aio
import time
import grpc
from worker.Protobuf import message_pb2
from worker.Protobuf.message_pb2_grpc import ChatAssistantServicer, add_ChatAssistantServicer_to_server
from worker.utils.mistral import get_response

server_port = 50051

class ChatAssistant (ChatAssistantServicer):
    async def GenerateResponse(self, request, context):
        print(f"=== DEBUG: Получен запрос ===")
        print(f"От: {request.user_name}")
        print(f"Сообщение: {request.user_message}")
        print(f"Заказов: {len(request.orders)}")


        chat_context = {
            "user_name": request.user_name,
            "user_message": request.user_message,
            "chat_history": list(request.chat_history),
            "orders": [
                {
                    "content": order.content,
                    "type": order.type,
                    "status": order.status
                }
                for order in request.orders
            ]
        }
        response = await get_response(chat_context)
        response_message = f"{response}"
        return message_pb2.ChatReply(assistant_message=response_message)

async def serve_async():
    server = aio.server(futures.ThreadPoolExecutor(max_workers=10))
    add_ChatAssistantServicer_to_server(
        ChatAssistant(), server)
    server.add_insecure_port(f'[::]:{server_port}')
    print(f"gRPC Worker server running on port {server_port}")
    await server.start()

    try:
        # Ожидаем завершения сервера
        await server.wait_for_termination()
    except KeyboardInterrupt:
        await server.stop(0)
        print("Сервер остановлен")

def serve():
    """Синхронная обертка для запуска асинхронного сервера"""
    asyncio.run(serve_async())

if __name__ == "__main__":
    serve()