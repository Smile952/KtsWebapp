namespace Application.DTOs
{
    public class RequestDTO
    {
        public int userId { get; set; }
        public int EmployeeId { get; set; }
        public int OrderTypeEnumId { get; set; }
        public string OrderContent { get; set; } = string.Empty;
    }
}
