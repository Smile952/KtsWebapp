using Application.Services;
using Infrastucture;
using Interface.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Interface.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        PasswordHasher _hasher;
        public UsersController(PasswordHasher hasher)
        {
            _hasher = hasher;
        }


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

            string passwordHash = _hasher.GenerateHashPassword(model.Password);

            var dto = new Application.DTOs.UserDTO()
            {
                Name = model.Name,
                Email = model.Email,
                PasswordHash = passwordHash,
                PermissionId = model.PermissionId
            };
            
            service.Create(new Application.DTOs.UserDTO()
            {
                Name = model.Name,
                Email = model.Email,
                PasswordHash = passwordHash,
                PermissionId = model.PermissionId
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

        [HttpPost("sign_up")]
        public IActionResult Register([FromKeyedServices("user_service")] UserService service, [FromBody] UserModel model)
        {
            if (model.IsAllData())
            {
                var temp = service.Read().Any(u => u.Email == model.Email && u.Name == model.Name);
                if (temp) return BadRequest("User with this Name and Email already exists");

                model.Password = _hasher.GenerateHashPassword(model.Password);

                var userDto = new Application.DTOs.UserDTO()
                {
                    Name = model.Name,
                    Email = model.Email,
                    PasswordHash = model.Password,
                    PermissionId = model.PermissionId
                };

                service.Create(userDto);
                return Ok($"User \"${userDto.Name}\" successfully registered");
            }
            return BadRequest("User data is not fulfilled");
        }
    }
}
