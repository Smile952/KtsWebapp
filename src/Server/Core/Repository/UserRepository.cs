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
            if (data != null) {
                data.Name = user.Name;
                data.Email = user.Email;
                data.PasswordHash = user.PasswordHash;
                data.Age = user.Age;
                context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            User? user = context.User.Find(id);
            if (!user.checkUserDataIsEmpty())
            {
                context.User.Remove(user);
                context.SaveChanges();
            }
        }

        public User ReadByEmail(string email)
        {
            return context.User.Find(email) ?? new User();
        }
    }
}
