namespace Application.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Age { get; set; }
        public string PasswordHash { get; set; } = string.Empty;
        public DateTime RegistrationDate { get; set; }
        public int PermissionId { get; set; }
        public bool IsBot { get; set; }
    }
}
