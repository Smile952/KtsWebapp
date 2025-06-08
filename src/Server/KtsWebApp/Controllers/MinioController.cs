using Interface.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Interface.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MinioController : Controller
    {
        [HttpGet("{name}")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(string name)
        {
            MinioModel model = new MinioModel();
            await model.GetImage(name);

            return Ok(model);
        }
    }
}
