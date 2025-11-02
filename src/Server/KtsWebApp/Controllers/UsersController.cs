using Application.Services;
using Interface.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Interface.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {


        [Authorize]
        [HttpGet]
        public IActionResult Get([FromKeyedServices("user_service")] UserService service)
        {
            
            return Ok(service.Read());
        }

        [Authorize]
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

        [HttpPost]
        public IActionResult Create([FromKeyedServices("user_service")] UserService service, [FromBody] UserModel model)
        {
            if (!model.IsAllData())
            {
                return BadRequest("User is empty");
            }
            service.Create(new Application.DTOs.UserDTO()
            {
                Name = model.Name,
                Email = model.Email,
                Password = model.PasswordHash,
                PermissionId = model.Permission
            });

            return Ok(new { message = "User creating status: success" });
        }

        [Authorize]
        [HttpPost("{id}")]
        public IActionResult Update([FromKeyedServices("user_service")] UserService service, int id, [FromBody] UserModel model)
        {
            if (id < 0)
            {
                return BadRequest("This id is lower then zero. Take higher.");
            }
            if (!model.IsPartialData())
            {
                return BadRequest("User is empty");
            }

            var user = service.ReadById(id);
            
            if (user == null)
            {
                return NotFound("Error find user by id");
            }
            else
            {
               service.Update(model.SetUserData(user));
            }
            return Ok(new { message = "User updating status: success" });
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete([FromKeyedServices("user_service")] UserService service, int id)
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
            else
            {
                service.Delete(id);
            }
            return Ok(new { message = "User deleting status: success" });
        }

        public IActionResult Register([FromKeyedServices("user_service")] UserService service, [FromBody] UserModel model)
        {
            return Ok();
        }
    }
}
