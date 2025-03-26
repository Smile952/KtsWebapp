namespace Application.DTOs
{
    public class UserDTO
    {
        public string Name { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Password { get; set; } = string.Empty;
        public DateTime RegistrationDate { get; set; }
    }
}
