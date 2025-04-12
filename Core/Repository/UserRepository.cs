using Core.ApplicationContext;
using Core.Models;

namespace Core.Repository
{
    public class UserRepository
    {
        Context context;
        public UserRepository(Context context)
        {
            this.context = context;
        }

        public void Create(User dto)
        {
            context.User.Add(dto);
            context.SaveChanges();
        }

        public IEnumerable<User> Read()
        {
            return context.User.ToList();
        }
        public User? ReadById(int id)
        {
            return context.User.Find(id);
        }
        public void Update(User user)
        {
            var data = context.User.Find(user.Id);
            data.Name = user.Name;
            data.Email = user.Email;
            data.password = user.password;
            data.age = user.age;
            context.SaveChanges();
        }

        public void Delete(int id)
        {
            User user = context.User.Find(id);
            context.User.Remove(user);
        }
    }
}
