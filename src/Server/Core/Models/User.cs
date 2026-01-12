using System.ComponentModel;

namespace Core.Models
{
    public class User
    {
        public int Id { get; set; }
        
        public string Name { get; set; } = string.Empty;
        
        public string Email { get; set; } = string.Empty;
        
        public int Age { get; set; }
        
        public string PasswordHash { get; set; } = string.Empty;
        
        public DateTime RegistrationDate { get; set; }

        public bool IsActive { get; set; }
       
        [DefaultValue(1)]
        public int PermissionId { get; set; }
        public Permissions Permission { get; set; }
        
        public List<Order>? Orders { get; set; }
       
        public List<Message> SendedMessages { get; set; }
        public List<Message> ReceivedMessages { get; set; }

        public bool checkUserDataIsEmpty()
        {
            return Id != 0 
                && Name != string.Empty 
                && Email != string.Empty
                && PermissionId != 0
                && Age != 0;
        }
    }
}
