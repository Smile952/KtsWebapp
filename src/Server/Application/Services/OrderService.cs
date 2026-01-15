
using Application.Services.Common;
using Core.Repository;
using Application.DTOs;

namespace Application.Services
{
    public class OrderService
    {
        OrderRepository repository;
        public OrderService(OrderRepository repo)
        {
            repository = repo;
        }
        public void Create(OrderDTO dto)
        {
            repository.Create(DtoToModel.ToModel(dto));
        }

        public List<OrderDTO> Read()
        {
            List<OrderDTO> orderDTOs= new List<OrderDTO>();
            var requests = repository.Read();
            foreach (var request in requests) 
            {
                orderDTOs.Add(ModelToDto.ToDTO(request));
            }
            return orderDTOs;
        }

        public List<OrderDTO> ReadByUserId(int id)
        {
            List<OrderDTO> orderDTOs = new List<OrderDTO>();
            var requests = repository.ReadByUserId(id);
            foreach (var request in requests)
            {
                orderDTOs.Add(ModelToDto.ToDTO(request));
            }
            return orderDTOs;
        }

        public OrderDTO? ReadById(int id)
        {
            return ModelToDto.ToDTO(repository.ReadById(id));
        }

        public void Update(OrderDTO dto)
        {
            repository.Update(DtoToModel.ToModel(dto));
        }
        public void Delete(int id)
        {
            repository.Delete(id);
        }
    }
}
