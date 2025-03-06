using Core.Models;
using Microsoft.EntityFrameworkCore;
using Core.ApplicationContext;

namespace Core.Repository
{
    public class OrderRepository
    {
        Context context;
        public OrderRepository (Context context)
        {
            this.context = context;
        }

        public void Create(Order order)
        {
            context.Order.Add(order);
            context.SaveChanges();
        }

        public IEnumerable<Order> Read()
        {
            return context.Order.ToList();
        }
        public Order ReadById(int id)
        {
            return context.Order.Find(id);
        }
    }
}
