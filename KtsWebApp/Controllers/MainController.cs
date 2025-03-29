using Application.Services;
using Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Interface.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class MainController : Controller
    {
        public class RequestInput
        {
            public int DevType { get; set; }
            public string Text { get; set; } = string.Empty;
        }

        [HttpPost("request")]
        public IActionResult RequestHandler([FromKeyedServices("service")] OrderService service, [FromBody] RequestInput input)
        {
            service.Create(new RequestDTO()
            {
                EmployeeId = 1,
                userId = 1,
                OrderTypeEnumId = input.DevType,
                OrderContent = input.Text
            });
            Console.WriteLine("i feel good");
            return Ok(new { message = "Success!" });
        }
    }
}