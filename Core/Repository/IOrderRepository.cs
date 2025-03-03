using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repository
{
    public interface IOrderRepository
    {
        public void Create();
        public void Read(int? id);
        public void Update(int id);
        public void Delete(int id);
    }
}
