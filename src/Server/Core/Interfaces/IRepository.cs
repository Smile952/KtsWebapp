namespace Core.Interfaces
{
    public interface IRepository<T>
    {
        public void Create(T dto);

        public IEnumerable<T> Read();
        
        public T? ReadById(int id);
        
        public void Update(T dto);

        public void Delete(int id);
    }
}
