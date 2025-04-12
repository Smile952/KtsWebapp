using Application.DTOs;
using Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
            return Ok(service.Read());
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

        public IActionResult Create([FromKeyedServices("order_service")] OrderService service)
        {
            return Ok(new { message = "All good" });
        }

        public IActionResult Update([FromKeyedServices("order_service")] OrderService service)
        {
            return Ok(new { message = "All good" });
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
