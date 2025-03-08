using Core.Models;
using Infrastructure.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}
