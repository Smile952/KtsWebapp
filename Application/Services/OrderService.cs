//TODO: use models from core to create crud repo in application with using dto
using Core.Models;
using Core.Repository;
using Infrastructure.DTOs;

namespace Application.Services
{
    abstract class OrderService
    {
        OrderRepository repository;
        public OrderService(OrderRepository repo)
        {
            repository = repo;
        }
        public void Create(RequestDTO dto)
        {

        }

        public List<RequestDTO> Read()
        {
            return new List<RequestDTO>();
        }

        public RequestDTO ReadById(int id)
        {
            RequestDTO dto = new RequestDTO();
            return ToDTO(repository.ReadById(id));
        }

        public RequestDTO ToDTO(Order order)
        {
            return new RequestDTO()
            {
                Id = order.Id,
                userId = order.userId,
                EmployeeId = order.EmployeeId,
                OrderContent = order.OrderContent,
                OrderTypeId = order.OrderTypeId
            };
        }
    }
}
