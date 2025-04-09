using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Interface.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get([FromKeyedServices("user_service")] UserService service)
        {
            return Ok(service.Read());
        }
        [HttpGet("{id}")]
        public IActionResult GetById([FromKeyedServices("user_service")] UserService service, int id)
        {
            if(id < 0)
            {
                return BadRequest("This id is lower then zero. Take higher.");
            }

            var res = service.ReadById(id);

            if (res == null)
            {
                return NotFound("Error on server or this user doesn't exist");
            }
            return Ok(res);
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
