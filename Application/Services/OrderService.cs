//TODO: use models from core to create crud repo in application with using dto
namespace Application.Services
{
    abstract class OrderService
    {
        public abstract void Create();

        public abstract void Delete(int id);

        public abstract void Read(int? id);

        public abstract void Update(int id);
    }
}
