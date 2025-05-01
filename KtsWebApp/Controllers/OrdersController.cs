using Application.DTOs;
using Application.Services;
using Interface.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;

namespace Interface.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get([FromKeyedServices("order_service")] OrderService service)
        {
            var orders = service.Read();
            if (Request.Query["status"] != "" && Int32.TryParse(Request.Query["status"], out int orderStatus))
            {
                orders = orders.Where(x => x.OrderStatusId == orderStatus).ToList();
            }
            if (Request.Query["type"] != "" && Int32.TryParse(Request.Query["type"], out int type))
            {
                orders = orders.Where(x => x.OrderTypeId == type).ToList();
            }
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromKeyedServices("order_service")] OrderService service, int id)
        {
            if(id < 0)
            {
                return BadRequest("Id lower then zero. Take higher");
            }
            var requestJson = JsonSerializer.Serialize(service.ReadById(id));

            if (requestJson == null)
            {
                return NotFound("Error or this order doesn't exist");
            }

            return Ok(new { message = "All good" });
        }

        [HttpPost]
        public IActionResult Create([FromKeyedServices("order_service")] OrderService service, [FromBody] OrderModel model)
        {
            if (!model.IsAllData())
            {
                return BadRequest("User is empty");
            }
            service.Create(new OrderDTO()
            {
                userId = model.UserId,
                EmployeeId = model.EmployeeId,
                OrderTypeId = model.OrderTypeId,
                OrderContent = model.OrderContent,
                OrderStatusId = 1
            });

            return Ok(new { message = "User creating status: success" });
        }

        [HttpPost("{id}")]
        public IActionResult Update([FromKeyedServices("order_service")] OrderService service, int id, [FromBody] OrderModel model)
        {
            if (id < 0)
            {
                return BadRequest("This id is lower then zero. Take higher.");
            }
            if (model.IsPartialData())
            {
                return BadRequest("Order is empty");
            }

            var order = service.ReadById(id);

            if (order == null)
            {
                return NotFound("Error find order by id");
            }
            else
            {
               service.Update(model.SetRequestData(order));
            }
            return Ok(new { message = "Order updating status: success" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromKeyedServices("order_service")] OrderService service, int id)
        {
            if (id < 0)
            {
                return BadRequest("This id is lower then zero. Take higher.");
            }

            var res = service.ReadById(id);

            if (res == null)
            {
                return NotFound("Error on server or this user doesn't exist");
            }
            else
            {
                service.Delete(id);
            }
            return Ok(new { message = "Delete was succefully" });
        }
    }
}
