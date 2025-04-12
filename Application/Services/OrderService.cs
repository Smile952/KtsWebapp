
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
        public void Create(RequestDTO dto)
        {
            repository.Create(DtoToModel.ToModel(dto));
        }

        public List<RequestDTO> Read()
        {
            List<RequestDTO> requestDTOs = new List<RequestDTO>();
            var requests = repository.Read();
            foreach (var request in requests) 
            {
                requestDTOs.Add(ModelToDto.ToDTO(request));
            }
            return requestDTOs;
        }

        public RequestDTO? ReadById(int id)
        {
            return ModelToDto.ToDTO(repository.ReadById(id));
        }

        public void Update(RequestDTO dto)
        {
            repository.Update(DtoToModel.ToModel(dto));
        }
        public void Delete(int id)
        {
            repository.Delete(id);
        }
    }
}
