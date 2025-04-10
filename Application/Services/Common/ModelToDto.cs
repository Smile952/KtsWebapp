﻿using Application.DTOs;
using Core.Models;

namespace Application.Services.Common
{
    class ModelToDto
    {
        public static RequestDTO ToDTO(Order order)
        {
            return new RequestDTO()
            {
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
                Name = employee.Name,
                Password = employee.Password,
                Post = employee.Post
            };
        }
        public static UserDTO ToDTO(User user)
        {
            return new UserDTO()
            {
                Name = user.Name,
                Email = user.Email,
                Age = user.age,
                Password = user.password,
                RegistrationDate = user.registrationDate
            };
        }
    }
}
