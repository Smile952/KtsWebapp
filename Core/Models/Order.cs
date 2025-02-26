using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    class Order
    {
        public int Id { get; set; }
        public int userId { get; set; }
        public int EmployeeId { get; set; }
        public string OrderContent { get; set; } = string.Empty;
        public User? User { get; set; }
        public Employee? Employee { get; set; }
    }
}
