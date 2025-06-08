using System.ComponentModel.DataAnnotations;

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
        public int OrderStatusId { get; set; }
        public User? User { get; set; }
        public Employee? Employee { get; set; }
        public OrdersTypeEnum? OrdersTypeEnum { get; set; }
        public OrderStatus? OrderStatus { get; set; }
    }
}
