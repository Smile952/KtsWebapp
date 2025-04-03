using Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Interface.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {

        public IActionResult GetEmployees([FromKeyedServices("employee_service")] EmployeeService service)
        {
            return Ok(new { message = "All good" });
        }

        public IActionResult GetEmployeeById([FromKeyedServices("employee_service")] EmployeeService service)
        {
            return Ok(new { message = "All good" });
        }

        public IActionResult CreateEmployee([FromKeyedServices("employee_service")] EmployeeService service)
        {
            return Ok(new { message = "All good" });
        }

        public IActionResult UpdateEmployee([FromKeyedServices("employee_service")] EmployeeService service)
        {
            return Ok(new { message = "All good" });
        }

        public IActionResult DeleteEmployee([FromKeyedServices("employee_service")] EmployeeService service)
        {
            return Ok(new { message = "All good" });
        }
    }
}
