
using Application.DTOs;
using Application.Services.Common;
using Core.Repository;

namespace Application.Services
{
    public class MessageService
    {

        MessageRepository repository;

        public MessageService(MessageRepository repository)
        {
            this.repository = repository;
        }

        public void Create(MessageDTO dto)
        {
            repository.Create(DtoToModel.ToModel(dto));
        }

        public List<MessageDTO> Read()
        {
           return repository.Read()
                            .Select(ModelToDto.ToDTO)
                            .ToList();
        }

        public MessageDTO? ReadById(int id)
        {
            return ModelToDto.ToDTO(repository.ReadById(id));
        }

        public void Update(MessageDTO dto)
        {
            repository.Update(DtoToModel.ToModel(dto));
        }

        public void Delete(int id)
        {
            repository.Delete(id);
        }
    }
}
