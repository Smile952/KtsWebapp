using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Employee
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(100)]
        public string Post { get; set; } = string.Empty;

        [DefaultValue(1)]
        public int PermissionId { get; set; }
        public List<Order>? Orders { get; set; }
        public Permissions Permission { get; set; }
    }
}
