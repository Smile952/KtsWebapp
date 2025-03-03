using Core.Models;
using Infrastructure.DTOs;

namespace Application.DTOs
{
    class OrderService
    {
        public Order toModel(RequestDTO dto) => new Order() 
        { 
            Id = dto.Id, 
            userId = dto.userId, 
            EmployeeId = dto.EmployeeId,    
            OrderTypeId = dto.OrderTypeId, 
            OrderContent = dto.OrderContent 
        };
    }
}
