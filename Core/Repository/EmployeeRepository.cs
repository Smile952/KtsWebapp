using Core.ApplicationContext;
using Core.Models;

namespace Core.Repository
{
    public class EmployeeRepository
    {
        Context context;
        public EmployeeRepository(Context context)
        {
            this.context = context;
        }

        public void Create(Employee dto)
        {
            context.Employee.Add(dto);
            context.SaveChanges();
        }

        public IEnumerable<Employee> Read()
        {
            return context.Employee.ToList();
        }
        public Employee? ReadById(int id)
        {
            return context.Employee.Find(id);
        }
        public void Update(Employee employee)
        {
            var data = context.Employee.Find(employee.Id);
            data.Name = employee.Name;
            data.Post = employee.Post;
            data.Password = employee.Password;
            context.SaveChanges();
        }
    }
}
