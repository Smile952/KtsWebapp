using Application.DTOs;
using Core.Models;

namespace Application.Services.Common
{
    class DtoToModel
    {
        public static Order ToModel(OrderDTO dto) => 
            new Order() 
            { 
                Id = dto.Id,
                UserId = dto.userId, 
                EmployeeId = dto.EmployeeId,
                OrdersTypeEnumId = dto.OrderTypeId, 
                OrderStatusId = dto.OrderStatusId
            };

        public static User ToModel(UserDTO dto)
        {
            return new User()
            {
                Id = dto.Id,
                Name = dto.Name,
                Email = dto.Email,
                Age = dto.Age,
                PasswordHash = dto.PasswordHash,
                RegistrationDate = dto.RegistrationDate,
                PermissionId = dto.PermissionId
            };

        }

        public static Employee ToModel(EmployeeDTO dto)
        {
            return new Employee()
            {
                Id = dto.Id,
                Name = dto.Name,
                Password = dto.Password,
                Post = dto.Post,
                PermissionId= dto.PermissionId
            };
        }
    }
}
