using System.ComponentModel.DataAnnotations;

namespace Core.Models
{
    public class Permissions
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<User> User { get; set; }
        public List<Employee> Employee { get; set; }
    }
}
