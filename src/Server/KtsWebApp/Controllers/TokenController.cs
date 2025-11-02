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
            var userData = service.Read().Where(x => x.Email == model.Email && x.Password == model.PasswordHash);

            if (userData.Count() == 0)
            {
                return BadRequest("This user was not registrated");
            }
            string token = _tokenProvider.Create(service, model);
            return Ok(new {token, userData });
        }
    }
}
