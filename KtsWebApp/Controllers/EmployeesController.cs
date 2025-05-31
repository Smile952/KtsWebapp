using Application.DTOs;
using Application.Services;
using Interface.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Interface.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeesController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get([FromKeyedServices("employee_service")] EmployeeService service)
        {
            if (Request.Query["sorting"] == "desc")
            {
                return Ok(service.Read().OrderByDescending(x => x.Id));
            }
            return Ok(service.Read().OrderBy(x => x.Id));
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromKeyedServices("employee_service")] EmployeeService service, int id)
        {
            if(id < 0)
            {
                return BadRequest("Incorrect id");
            }

            EmployeeDTO employee = service.ReadById(id);
            
            if (employee == null)
            {
                return NotFound("This employee was terminated or wasn't exist");
            }
            else
            {
                var employeeJson = JsonSerializer.Serialize(employee);
                return Ok(employeeJson);
            }
        }
        [HttpPost]
        public IActionResult Create([FromKeyedServices("employee_service")] EmployeeService service, [FromBody] EmployeeModel model)
        {
            if (!model.IsAllData())
            {
                return BadRequest("User is empty");
            }
            service.Create(new EmployeeDTO()
            {
                Name = model.Name,
                Post = model.Post
            });

            return Ok(new { message = "User creating status: success" });
        }
        [HttpPost("{id}")]
        public IActionResult Update([FromKeyedServices("employee_service")] EmployeeService service, int id, [FromBody] EmployeeModel model)
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
            return Ok(new { message = "Employee updating status: success" });
        }
        [HttpDelete("{id}")]
        public IActionResult Delete([FromKeyedServices("employee_service")] EmployeeService service, int id)
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
