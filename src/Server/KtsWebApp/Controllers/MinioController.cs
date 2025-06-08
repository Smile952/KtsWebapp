using Interface.Models;
using Microsoft.AspNetCore.Mvc;

namespace Interface.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
