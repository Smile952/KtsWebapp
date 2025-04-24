using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Order
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int EmployeeId { get; set; }
        [Required]
        public int OrdersTypeEnumId { get; set; }
        public string OrderContent { get; set; } = string.Empty;
        public int OrderStatusId { get; set; }
        public User? User { get; set; }
        public Employee? Employee { get; set; }
        public OrdersTypeEnum? OrdersTypeEnum { get; set; }
        public OrderStatus? OrderStatus { get; set; }
        public List<Service>? Services { get; set; }
    }
}
