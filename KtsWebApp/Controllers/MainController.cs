using Microsoft.AspNetCore.Mvc;

namespace Interface.Controllers
{
    public class MainController : Controller
    {
        [HttpGet("/DevTypes")]
        public IActionResult DevTypes()
        {
            return View();
        }
        [HttpGet("/Request")]
        public IActionResult Request()
        {
            return View();
        }
    }
}
