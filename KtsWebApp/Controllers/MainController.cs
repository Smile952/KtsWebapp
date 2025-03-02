using Microsoft.AspNetCore.Mvc;

namespace Interface.Controllers
{
    public class MainController : Controller
    {
        public IActionResult DevTypes()
        {
            return View();
        }
        public IActionResult Request()
        {
            return View();
        }
    }
}
