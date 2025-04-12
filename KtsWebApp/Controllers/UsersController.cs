using Application.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

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

        [HttpPost]
        public IActionResult Create([FromKeyedServices("user_service")] UserService service)
        {
            service.Create(new Application.DTOs.UserDTO()
            {
                Name = Request.Form["Name"],
                Email = Request.Form["Email"],
                Age = Int32.Parse(Request.Form["Age"]),
                Password = Request.Form["Password"],
                RegistrationDate = DateTime.Parse(Request.Form["RegistrationDate"])
            });

            return Ok(new { message = "Successfully creating person" });
        }

        [HttpPost("{id}")]
        public IActionResult Update([FromKeyedServices("user_service")] UserService service, int id)
        {
            if (id < 0)
            {
                return BadRequest("This id is lower then zero. Take higher.");
            }

            var user = service.ReadById(id);

            if (user == null)
            {
                return NotFound("Error find user by id");
            }
            else
            {
                if (!Request.Form["Name"].IsNullOrEmpty()) user.Name = Request.Form["Name"];

                if (!Request.Form["Email"].IsNullOrEmpty()) user.Email = Request.Form["Email"];

                if (!Request.Form["Age"].IsNullOrEmpty()) user.Age = Int32.Parse(Request.Form["Age"]);

                if (!Request.Form["Password"].IsNullOrEmpty()) user.Password = Request.Form["Password"];

                if (!Request.Form["RegistrationDate"].IsNullOrEmpty()) user.RegistrationDate = DateTime.Parse(Request.Form["RegistrationDate"]);

                service.Update(user);
            }
            return Ok(new { message = "All good" });
        }

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
            return Ok(new { message = "Delete was succefully" });
        }
    }
}
