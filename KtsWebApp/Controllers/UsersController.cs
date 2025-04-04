using Application.DTOs;
using Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Interface.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get([FromKeyedServices("user_service")] UserService service)
        {
            var usersJson = JsonSerializer.Serialize(service.Read());
            return Ok(new { usersJson });
        }
        [HttpGet("{id}")]
        public IActionResult GetById([FromKeyedServices("user_service")] UserService service, int id)
        {
            if(id < 0)
            {
                return BadRequest("This id is lower then zero. Take higher.");
            }

            var userJson = JsonSerializer.Serialize(service.ReadById(id));

            if (userJson == null)
            {
                return NotFound("Error on server or this user doesn't exist");
            }
            return Ok(new { userJson });
        }

        public IActionResult Create([FromKeyedServices("user_service")] UserService service)
        {
            return Ok(new { message = "All good" });
        }

        public IActionResult Update([FromKeyedServices("user_service")] UserService service)
        {
            return Ok(new { message = "All good" });
        }

        public IActionResult Delete([FromKeyedServices("user_service")] UserService service)
        {
            return Ok(new { message = "All good" });
        }
    }
}
