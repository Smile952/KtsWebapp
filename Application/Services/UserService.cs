using Application.DTOs;
using Application.Services.Common;
using Core.Repository;

namespace Application.Services
{
    public class UserService
    {
        UserRepository repository;
        public UserService(UserRepository repo)
        {
            repository = repo;
        }
        public void Create(UserDTO dto)
        {
            repository.Create(DtoToModel.ToModel(dto));
        }

        public List<UserDTO> Read()
        {
            List<UserDTO> userDTOs = new List<UserDTO>();
            var users = repository.Read();
            foreach (var user in users)
            {
                userDTOs.Add(ModelToDto.ToDTO(user));
            }
            return userDTOs;
        }

        public UserDTO? ReadById(int id)
        {
            return ModelToDto.ToDTO(repository.ReadById(id));
        }

        public void Update(UserDTO dto)
        {
            repository.Update(DtoToModel.ToModel(dto));
        }

        public void Delete(int id)
        {
            repository.Delete(id); 
        }
    }
}
