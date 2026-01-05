using Application.Services;
using Infrastucture;
using Interface.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Interface.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : Controller
    {
        private readonly TokenBuilder _tokenBuilder;
        private readonly PasswordHasher _hasher;
        public TokenController(TokenBuilder tokenProvider, PasswordHasher hasher)
        {
            _tokenBuilder = tokenProvider;
            _hasher = hasher;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Sync() => 
            NoContent();
        

        [HttpPost]
        public IActionResult GetToken([FromKeyedServices("user_service")] UserService service, [FromBody] UserModel model, IConfiguration configuration)
        {
            var userData = service.Read().FirstOrDefault(x => x.Email == model.Email && _hasher.VerifyPassword(model.Password, x.PasswordHash));

            if (userData == null)
            {
                return BadRequest("This user was not registred");
            }
            
            string token = _tokenBuilder.Create(service, model.Email, model.Password);
            
            return Ok(new {token });
        }
    }
}
