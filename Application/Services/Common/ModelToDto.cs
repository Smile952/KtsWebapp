using Application.DTOs;
using Core.Models;

namespace Application.Services.Common
{
    class ModelToDto
    {
        public static RequestDTO ToDTO(Order order)
        {
            return new RequestDTO()
            {
                Id = order.Id,
                userId = order.userId,
                EmployeeId = order.EmployeeId,
                OrderContent = order.OrderContent,
                OrderTypeId = order.OrdersTypeEnumId
            };
        }

        public static EmployeeDTO ToDTO(Employee employee)
        {
            return new EmployeeDTO()
            {
                Id = employee.Id,
                Name = employee.Name,
                Password = employee.Password,
                Post = employee.Post
            };
        }
        public static UserDTO ToDTO(User user)
        {
            return new UserDTO()
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Age = user.age,
                Password = user.password,
                RegistrationDate = user.registrationDate
            };
        }
    }
}
