using Application.DTOs;
using Application.Services;
using Grpc.Net.Client;
using KTS.Configuration;
using KTS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MessageExchageClient = MessageExchange.MessageExchange.MessageExchangeClient;


namespace KTS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class MessagesController : ControllerBase
    {
        private readonly MessageExchageClient _client;

        public MessagesController(MessageExchageClient client)
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
        public async Task<IActionResult> Post([FromKeyedServices("message_service")] MessageService mService, [FromKeyedServices("user_service")] UserService uService, [FromBody] MessageModel model)
        {

            if(!model.IsALlData()) return BadRequest("Message is empty");

            bool IsReceiverBot = uService.ReadById(model.ReceiverId).IsBot;
            if (IsReceiverBot)
            {
                mService.Create(new MessageDTO()
                {
                    Text = model.Text,
                    SenderId = model.SenderId,
                    ReceiverId = model.ReceiverId,
                    IsReaded = model.IsReaded,
                    SendedAt = model.SendedAt
                });

                var reply = await _client.GetAIResponseAsync(new MessageExchange.Message { Content = model.Text });
                var ans = reply.Content;

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
