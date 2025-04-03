using Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Interface.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        public IActionResult GetOrders([FromKeyedServices("order_service")] OrderService service)
        {
            return Ok(new { message = "All good" });
        }

        public IActionResult GetOrderById([FromKeyedServices("order_service")] OrderService service)
        {
            return Ok(new { message = "All good" });
        }

        public IActionResult CreateOrders([FromKeyedServices("order_service")] OrderService service)
        {
            return Ok(new { message = "All good" });
        }

        public IActionResult UpdateOrder([FromKeyedServices("order_service")] OrderService service)
        {
            return Ok(new { message = "All good" });
        }

        public IActionResult DeleteOrder([FromKeyedServices("order_service")] OrderService service)
        {
            return Ok(new { message = "All good" });
        }
    }
}
