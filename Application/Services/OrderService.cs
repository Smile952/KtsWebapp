using Core.Repository;
using Infrastructure.DTOs;

namespace Application.Services
{
    abstract class OrderService : IOrderRepository
    {
        public abstract void Create();
        public override void Create(RequestDTO dTO)
        {
            throw new NotImplementedException();
        }

        public abstract void Delete(int id);

        public abstract void Read(int? id);

        public abstract void Update(int id);
    }
}
