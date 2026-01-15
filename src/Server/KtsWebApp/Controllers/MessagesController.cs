using Application.DTOs;
using Application.Services;
using KTS.Controllers.common;
using KTS.Models;
using MessageExchange;
using Microsoft.AspNetCore.Mvc;
using ChatAssistantClient = MessageExchange.ChatAssistant.ChatAssistantClient;
//using MessageExchageClient = MessageExchange.MessageExchange.MessageExchangeClient;


namespace KTS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class MessagesController : ControllerBase
    {
        private readonly ChatAssistantClient _client;

        public MessagesController(ChatAssistantClient client)
        {
            _client = client;
        }

        [HttpGet]
        public IActionResult Get([FromKeyedServices("message_service")] MessageService service) 
        {
            List<MessageDTO> messages = service.Read();

            return Ok(messages);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromKeyedServices("message_service")] MessageService mService, 
                                              [FromKeyedServices("user_service")] UserService uService, 
                                              [FromKeyedServices("order_service")] OrderService oService, 
                                              [FromBody] MessageModel model)
        {

            if(!model.IsALlData()) return BadRequest("Message is empty");
            
            

            bool IsReceiverBot = uService.ReadById(model.ReceiverId).IsBot;
            if (IsReceiverBot)
            {
                var user = uService.ReadById(model.SenderId);

                var userOrders = oService.ReadByUserId(user.Id);

                var messages = mService.Read();

                mService.Create(new MessageDTO()
                {
                    Text = model.Text,
                    SenderId = model.SenderId,
                    ReceiverId = model.ReceiverId,
                    IsReaded = model.IsReaded,
                    SendedAt = model.SendedAt
                });

                var request = new ChatRequest
                {
                    UserName = user.Name,
                    UserMessage = model.Text
                };

                var ordersProto = userOrders.Select(x => new Order
                {
                    Content = x.OrderContent,
                    Status = OrdersTypes.ordersType
                        .Where(ot => ot.Key == x.OrderTypeId)
                        .Select(ot => ot.Value)
                        .FirstOrDefault() ?? string.Empty,
                    Type = OrdersStatuses.orderStatuses
                        .Where(os => os.Key == x.OrderStatusId)
                        .Select(os => os.Value)
                        .FirstOrDefault() ?? string.Empty
                }).ToList();

                request.Orders.AddRange(ordersProto);
                request.ChatHistory.AddRange(messages.Select(x => x.Text).ToList());

                var reply = await _client.GenerateResponseAsync(request);

                var ans = reply.AssistantMessage;

                mService.Create(new MessageDTO()
                {
                    Text = ans,
                    SenderId = 1,
                    ReceiverId = model.SenderId,
                    IsReaded = true,
                    SendedAt = DateTime.Now
                });

                return Ok(new { text = ans });
            }

            mService.Create(new MessageDTO()
            {
                Id = model.Id,
                Text = model.Text,
                SenderId = model.SenderId,
                ReceiverId = model.ReceiverId,
                IsReaded = model.IsReaded,
                SendedAt = model.SendedAt
            });

            return Ok();
        }
    }
}
