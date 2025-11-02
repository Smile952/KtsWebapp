using Application.DTOs;
using Application.Services;
using Core.Models;
using Interface.Controllers.common;
using Interface.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;
using System.Text.Json;

namespace Interface.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {       
        [HttpGet]
        public IActionResult Get([FromKeyedServices("order_service")] OrderService oService, 
                                 [FromKeyedServices("user_service")] UserService uService, 
                                 [FromKeyedServices("employee_service")] EmployeeService eService)
        {
            var options = new JsonSerializerOptions
            {
                WriteIndented = true,
                Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
            };
            
            var orders = oService.Read();
            var users = uService.Read();
            var employees = eService.Read();
            if (Request.Query["status"] != "" && Int32.TryParse(Request.Query["status"], out int orderStatus))
            {
                orders = orders.Where(x => x.OrderStatusId == orderStatus).ToList();
            }
            if (Request.Query["type"] != "" && Int32.TryParse(Request.Query["type"], out int type))
            {
                orders = orders.Where(x => x.OrderTypeId == type).ToList();
            }
            var result = JsonSerializer.Serialize(            
                from order in orders
                         join user in users on order.userId equals user.Id
                         join employee in employees on order.EmployeeId equals employee.Id
                         select new
                         {
                             id = order.Id,
                             userId = user.Id,
                             userName = user.Name,
                             employeeId = employee.Id,
                             employeeName = employee.Name,
                             orderTypeId = order.OrderTypeId,
                             orderStatus = order.OrderStatusId
                         }, options);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetByOrderId([FromKeyedServices("order_service")] OrderService service, int id)
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

        [HttpGet("user_orders/{user_id}")]
        public IActionResult GetByUserId([FromKeyedServices("order_service")] OrderService oService,
                                         [FromKeyedServices("employee_service")] EmployeeService eService, int user_id)
        {
            var options = new JsonSerializerOptions
            {
                WriteIndented = true,
                Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
            };
            if (user_id < 0)
            {
                return BadRequest("User id must be higher then 0");
            }
            var employees = eService.Read();
            var orders = oService.Read().Where(x => x.userId == user_id);
            var result = JsonSerializer.Serialize(from order in orders
                                                  join employee in employees on order.EmployeeId equals employee.Id
                                                  select new
                                                  {
                                                      id = order.Id,
                                                      userId = order.userId,
                                                      employeeId = employee.Id,
                                                      employeeName = employee.Name,
                                                      orderTypeId = order.OrderTypeId,
                                                      orderTypeName = OrdersTypes.ordersType[order.OrderTypeId],
                                                      orderStatusId = order.OrderStatusId,
                                                      orderStatusName = OrdersStatuses.orderStatuses[order.OrderStatusId]
                                                  }, options);

            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create([FromKeyedServices("order_service")] OrderService service, [FromBody] OrderModel model)
        {
            if (!model.IsAllData())
            {
                return BadRequest("User is empty");
            }

            OrderDTO dto = new OrderDTO()
            {
                userId = model.UserId,
                EmployeeId = model.EmployeeId,
                OrderTypeId = model.OrderTypeId,
                OrderStatusId = 1
            };

            service.Create(dto);

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





