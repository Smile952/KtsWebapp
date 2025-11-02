using Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Interface.Models
{
    public class UserModel
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Age { get; set; } = string.Empty;
        public DateTime RegistrationDate { get; set; }
        public int Permission { get; set; }
        public string PasswordHash { get; set; }

        public bool IsAllData()
        {
            if (Name != null && Email != null && PasswordHash != null && Permission != 0)
            {
                return true;
            }
            return false;
        }
        public bool IsPartialData()
        {
            if (Name != null || Email != null || Age != null|| RegistrationDate != DateTime.MinValue)
            {
                return true;
            }
            return false;
        }

        public UserDTO SetUserData(UserDTO user)
        {
            if(user.Name != null) user.Name = Name;
            if(user.Email != null) user.Email = Email;
            if(user.Age != null) user.Age = Int32.Parse(Age);
            if(user.RegistrationDate > DateTime.MinValue) user.RegistrationDate = RegistrationDate;

            return user;
        }
    }
}
