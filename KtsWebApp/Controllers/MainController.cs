using Application.Services;
using Core.ApplicationContext;
using Core.Repository;
using Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Interface.Controllers
{
    public class MainController : Controller
    {
        [HttpGet("/")]
        public IActionResult DevTypes()
        {
            
            return View();
        }
        
        public IActionResult Prompt()
        {
            ViewData["DevType"] = TempData["type"];
            return View();
        }

        public IActionResult RequestHandler([FromKeyedServices("service")] OrderService service)
        {
            int dev = Int32.Parse((string?)Request.Form["DevType"] ?? "0");
            string? content = Request.Form["content"];
            service.Create(new RequestDTO() { EmployeeId = 1, userId = 1, OrderTypeId = dev, OrderContent = content ?? ""});
            return Redirect("/");
        }

        public IActionResult TransferHandler()
        {
            string? type = Request.Query["DevType"];
            TempData["type"] = type;
            return RedirectToAction("Prompt", "Main");
        }
    }
}
