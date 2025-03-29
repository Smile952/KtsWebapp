using Application.DTOs;
using Application.Services;
using Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Interface.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RAController : Controller
    {
        [HttpPost("registr")]
        public IActionResult Registration([FromKeyedServices("UserService")] UserService service, [FromBody] User input)
        {
            service.Create(new UserDTO()
            {
                Name = input.Name,
                Email = input.Email,
                Age = input.age,
                Password = input.password,
                RegistrationDate = DateTime.Now
            });
            return Ok(new { message = "Registration was successfully" });
        }

        [HttpPost("auth")]
        public IActionResult Authorization([FromKeyedServices("UserService")] UserService service, [FromBody] User input)
        {
            
            return Ok(new { message = "Authorization was successfully" });
        }
    }
}
