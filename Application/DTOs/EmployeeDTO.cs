namespace Application.DTOs
{
    public class EmployeeDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Post { get; set; } = string.Empty;
        public int PermissionId { get; set; }
    }
}
