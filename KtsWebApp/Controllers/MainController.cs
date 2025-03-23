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
        [HttpPost("request")]
        public IActionResult RequestHandler([FromKeyedServices("service")] OrderService service)
        {
            try
            {
                if (!int.TryParse(Request.Form["devType"], out int dev))
                {
                    return BadRequest(new { error = "Invalid Development type input" });
                }
                string? content = Request.Form["text"];
                if (string.IsNullOrEmpty(content))
                {
                    return BadRequest(new { error = "Empty content text" });
                }
                service.Create(new RequestDTO()
                {
                    EmployeeId = 1,
                    userId = 1,
                    OrderTypeId = dev,
                    OrderContent = content
                });
                Console.WriteLine(content);
                return Ok(new { message = "Request succefully created" });
            }
            catch (Exception e) 
            {
                return StatusCode(500, new { error = "Internal serveer error" });
            }
        }
    }
}
