using Application.DTOs;
using Core.Models;

namespace Application.Services.Common
{
    class DtoToModel
    {
        public static Order ToModel(RequestDTO dto) => 
            new Order() 
            { 
                Id = dto.Id,
                userId = dto.userId, 
                EmployeeId = dto.EmployeeId,
                OrdersTypeEnumId = dto.OrderTypeId, 
                OrderContent = dto.OrderContent
            };

        public static User ToModel(UserDTO dto)
        {
            return new User()
            {
                Id = dto.Id,
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
                Id = dto.Id,
                Name = dto.Name,
                Password = dto.Password,
                Post = dto.Post
            };
        }
    }
}
