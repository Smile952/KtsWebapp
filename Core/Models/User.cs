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
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;
        [Range(0, 150)]
        public int Age { get; set; }
        [Required, MinLength(6)]
        public string Password { get; set; } = string.Empty;
        public DateTime RegistrationDate { get; set; }
        public List<Order>? Orders { get; set; }
    }
}
