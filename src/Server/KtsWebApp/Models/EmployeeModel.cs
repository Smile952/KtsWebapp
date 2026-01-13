using Application.DTOs;

namespace KTS.Models
{
    public class EmployeeModel
    {
        public string Name { get; set; } = string.Empty;
        public string Post { get; set; } = string.Empty;

        public bool IsAllData()
        {
            if (Name != null && Post != null)
            {
                return true;
            }
            return false;
        }
        public bool IsPartialData()
        {
            if (Name != null || Post!= null)
            {
                return true;
            }
            return false;
        }

        public EmployeeDTO SetRequestData(EmployeeDTO employee)
        {
            if (Name != null) employee.Name = Name;
            if (Post != null) employee.Post = Post;

            return employee;
        }
    }
}
