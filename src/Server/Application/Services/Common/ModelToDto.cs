using Application.DTOs;
using Core.Models;

namespace Application.Services.Common
{
    class ModelToDto
    {
        public static OrderDTO ToDTO(Order order)
        {
            return new OrderDTO()
            {
                Id = order.Id,
                userId = order.UserId,
                EmployeeId = order.EmployeeId,
                OrderTypeId = order.OrdersTypeEnumId,
                OrderStatusId = order.OrderStatusId
            };
        }

        public static EmployeeDTO ToDTO(Employee employee)
        {
            return new EmployeeDTO()
            {
                Id = employee.Id,
                Name = employee.Name,
                Password = employee.Password,
                Post = employee.Post,
                PermissionId = employee.PermissionId,
            };
        }
        public static UserDTO ToDTO(User user)
        {
            return new UserDTO()
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Age = user.Age,
                PasswordHash = user.PasswordHash,
                RegistrationDate = user.RegistrationDate,
                PermissionId = user.PermissionId
            };
        }
    }
}
