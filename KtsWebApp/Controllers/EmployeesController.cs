using Application.DTOs;
using Application.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Interface.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get([FromKeyedServices("employee_service")] EmployeeService service)
        {
            var employeeJson = JsonSerializer.Serialize(service.Read());
            return Ok(new { employeeJson });
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
        public IActionResult Create([FromKeyedServices("employee_service")] EmployeeService service)
        {

            return Ok(new { message = "All good" });
        }
        [HttpPost]
        public IActionResult Update([FromKeyedServices("employee_service")] EmployeeService service)
        {
            return Ok(new { message = "All good" });
        }
        [HttpDelete("id")]
        public IActionResult Delete([FromKeyedServices("employee_service")] EmployeeService service, int id)
        {
            return Ok(new { message = "All good" });
        }
    }
}
