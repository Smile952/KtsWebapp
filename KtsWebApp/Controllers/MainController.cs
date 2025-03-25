using Application.Services;
using Core.ApplicationContext;
using Core.Repository;
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
                OrderTypeId = input.DevType,
                OrderContent = input.Text
            });
            Console.WriteLine("i feel good");
            return Ok(new { message = "Success!" });
        }
    }
}