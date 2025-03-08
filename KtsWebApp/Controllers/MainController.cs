using Application.Services;
using Core.ApplicationContext;
using Core.Repository;
using Infrastructure.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Interface.Controllers
{
    public class MainController : Controller
    {
        public IActionResult DevTypes()
        {
            return View();
        }
        [HttpGet("/")]
        public IActionResult Prompt()
        {
            return View();
        }

        public IActionResult RequestHandler()
        {
            int dev = Int32.Parse(Request.Form["DevType"]);
            string? content = Request.Form["content"];
            OrderService service = new OrderService(new OrderRepository(new Context()));
            service.Create(new RequestDTO() { EmployeeId = 1, userId = 1, OrderTypeId = dev, OrderContent = content });
            return Redirect("/Main/DevTypes");
        }
    }
}
