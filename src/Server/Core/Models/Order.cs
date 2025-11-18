using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int EmployeeId { get; set; }
        [Required]
        public int OrdersTypeEnumId { get; set; }
        public int OrderStatusId { get; set; }
        public string OrderContent { get; set; } = string.Empty;
        public User? User { get; set; }
        public Employee? Employee { get; set; }
        public OrdersTypeEnum? OrdersTypeEnum { get; set; }
        public OrderStatus? OrderStatus { get; set; }
    }
}
