using Microsoft.AspNetCore.Mvc;

namespace Interface.Controllers
{
    public class RAController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
