using Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Interface.Models
{
    public class UserModel
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Age { get; set; }
        public DateTime RegistrationDate { get; set; }

        public bool IsAllData()
        {
            if (Name != null && Email != null && Age != 0 && RegistrationDate != DateTime.MinValue)
            {
                return true;
            }
            return false;
        }
        public bool IsPartialData()
        {
            if (Name != null || Email != null || Age != 0 || RegistrationDate != DateTime.MinValue)
            {
                return true;
            }
            return false;
        }

        public UserDTO SetUserData(UserDTO user)
        {
            if(user.Name != null) user.Name = Name;
            if(user.Email != null) user.Email = Email;
            if(user.Age > 0) user.Age = Age;
            if(user.RegistrationDate > DateTime.MinValue) user.RegistrationDate = RegistrationDate;

            return user;
        }
    }
}
