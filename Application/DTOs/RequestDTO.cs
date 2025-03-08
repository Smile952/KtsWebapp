using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.DTOs
{
    public class RequestDTO
    {
        public int userId { get; set; }
        public int EmployeeId { get; set; }
        public int OrderTypeId { get; set; }
        public string OrderContent { get; set; } = string.Empty;
    }
}
