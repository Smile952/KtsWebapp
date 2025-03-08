
using Application.Services.Common;
using Core.Models;
using Core.Repository;
using Infrastructure.DTOs;

namespace Application.Services
{
    public class OrderService
    {
        OrderRepository repository;
        public OrderService(OrderRepository repo)
        {
            repository = repo;
        }
        public void Create(RequestDTO dto)
        {
            repository.Create(DtoToModel.ToModel(dto));
        }

        public List<RequestDTO> Read()
        {
            return new List<RequestDTO>();
        }

        public RequestDTO? ReadById(int id)
        {
            return ModelToDto.ToDTO(repository.ReadById(id));
        }

        public void Update(RequestDTO dto)
        {
            repository.Update(DtoToModel.ToModel(dto));
        } 
    }
}
