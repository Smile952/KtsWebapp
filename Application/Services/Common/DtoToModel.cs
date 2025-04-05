using Application.DTOs;
using Core.Models;

namespace Application.Services.Common
{
    class DtoToModel
    {
        public static Order ToModel(RequestDTO dto) => 
            new Order() 
            { 
                userId = dto.userId, 
                EmployeeId = dto.EmployeeId, 
                OrderTypeId = dto.OrderTypeId, 
                OrderContent = dto.OrderContent
            };

        public static User ToModel(UserDTO dto)
        {
            return new User()
            {
                Name = dto.Name,
                Email = dto.Email,
                age = dto.Age,
                password = dto.Password,
                registrationDate = dto.RegistrationDate
            };

        }

        public static Employee ToModel(EmployeeDTO dto)
        {
            return new Employee()
            {
                Name = dto.Name,
                Password = dto.Password,
                Post = dto.Post
            };
        }
    }
}
