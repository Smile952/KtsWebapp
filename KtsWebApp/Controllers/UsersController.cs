using Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Interface.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public IActionResult GetUsers([FromKeyedServices("user_service")] UserService service)
        {
            return Ok(new { message = "All good" });
        }

        public IActionResult GetUserById([FromKeyedServices("user_service")] UserService service)
        {
            return Ok(new { message = "All good" });
        }

        public IActionResult CreateUsers([FromKeyedServices("user_service")] UserService service)
        {
            return Ok(new { message = "All good" });
        }

        public IActionResult UpdateUser([FromKeyedServices("user_service")] UserService service)
        {
            return Ok(new { message = "All good" });
        }

        public IActionResult DeleteUser([FromKeyedServices("user_service")] UserService service)
        {
            return Ok(new { message = "All good" });
        }
    }
}
