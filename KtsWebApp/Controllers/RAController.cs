using Microsoft.AspNetCore.Mvc;

namespace Interface.Controllers
{
    public class RAController : Controller
    {
        public IActionResult Registration()
        {
            return View();
        }
        public IActionResult Authorization()
        {
            return View();
        }
    }
}
