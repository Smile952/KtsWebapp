using Application.DTOs;
using Application.Services.Common;
using Core.Repository;

namespace Application.Services
{
    class EmployeeService
    {
        EmployeeRepository repository;
        public EmployeeService(EmployeeRepository repo)
        {
            repository = repo;
        }
        public void Create(EmployeeDTO dto)
        {
            repository.Create(DtoToModel.ToModel(dto));
        }

        public List<EmployeeDTO> Read()
        {
            return new List<EmployeeDTO>();
        }

        public EmployeeDTO? ReadById(int id)
        {
            return ModelToDto.ToDTO(repository.ReadById(id));
        }

        public void Update(EmployeeDTO dto)
        {
            repository.Update(DtoToModel.ToModel(dto));
        }
    }
}
