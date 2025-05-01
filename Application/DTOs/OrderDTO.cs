namespace Application.DTOs
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int userId { get; set; }
        public int EmployeeId { get; set; }
        public int OrderTypeId { get; set; }
        public string OrderContent { get; set; } = string.Empty;
        public int OrderStatusId { get; set; }
        public DateTime OrderDate { get; set; }
        public int ServiceId { get; set; }
    }
}
