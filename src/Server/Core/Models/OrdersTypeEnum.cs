using System.ComponentModel.DataAnnotations;

namespace Core.Models
{
    public class OrdersTypeEnum
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string OrderName { get; set; } = string.Empty;

        public List<Order>? Orders{ get; set; }
    }
}
