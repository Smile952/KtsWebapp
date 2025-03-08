using Core.Models;
using Infrastructure.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
                OrderTypeId = order.OrderTypeId
            };
        }
    }
}
