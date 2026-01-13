from concurrent import futures
import time
import grpc

from worker.Protobuf.message_pb2_grpc import MessageExchangeServicer, add_MessageExchangeServicer_to_server

server_port = 50051

class MessageExchange (MessageExchangeServicer):
    def GetAIResponse(self, request, context):
        print(f"Received message from User: {request.content}")
        response_message = f"Я ебал меня сосали! You said: {request.content}"
        from Protobuf import message_pb2
        return message_pb2.Message(content=response_message)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    add_MessageExchangeServicer_to_server(
        MessageExchange(), server)
    server.add_insecure_port(f'[::]:{server_port}')
    print(f"gRPC Worker server running on port {server_port}")
    server.start()

    try:
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == "__main__":
    serve()