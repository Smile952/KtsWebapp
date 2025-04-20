using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Age { get; set; }

        public string Password { get; set; } = string.Empty;
        public DateTime RegistrationDate { get; set; }
        public List<Order>? Orders { get; set; }
    }
}
