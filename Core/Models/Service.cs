using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Service
    {
        public int Id { get; set; } 
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public double Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public List<Order>? Orders { get; set; }

    }
}
