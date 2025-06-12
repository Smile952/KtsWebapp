using Application.Services;
using Interface.Models;
using Interface.Providers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Interface.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : Controller
    {
        private readonly TokenProvider _tokenProvider;
        public TokenController(TokenProvider tokenProvider)
        {
            _tokenProvider = tokenProvider;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Sync()
        {
            return Ok("Sync success");
        }

        [HttpPost]
        public IActionResult GetToken([FromKeyedServices("user_service")] UserService service, [FromBody] UserModel model, IConfiguration configuration)
        {
            var users = service.Read().Where(x => x.Email == model.Email && x.Password == model.Password);

            if (users.Count() == 0)
            {
                return BadRequest("This user was not registrated");
            }
            var role = users.Select(x => x.PermissionId).FirstOrDefault();
            string token = _tokenProvider.Create(service, model);
            var res = JsonSerializer.Serialize(token);
            return Ok(new { Token = token, Role = users.Select(x => x.PermissionId).FirstOrDefault(), UserId=users.Select(x => x.Id).FirstOrDefault() });
        }
    }
}
