using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public int age { get; set; }
        public string password { get; set; } = string.Empty;
        public DateTime registrationDate { get; set; }
        public List<Order>? Orders { get; set; }
    }
}
