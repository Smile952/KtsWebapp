using Core.Models;
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

        public void Create(Order dto)
        {
            context.Order.Add(dto);
            context.SaveChanges();
        }

        public List<Order> Read()
        {
            return context.Order.ToList();
        }

        public List<Order> ReadByUserId(int userId)
        {
            return context.Order.Where(o => o.UserId == userId).ToList();
        }

        public Order? ReadById(int id)
        {
            return context.Order.Find(id);
        }
        public void Update(Order order)
        {
            var data = context.Order.Find(order.Id);
            data.OrdersTypeEnumId = order.OrdersTypeEnumId;
            data.OrderStatusId = order.OrderStatusId;
            context.SaveChanges();
        }
        public void Delete(int id)
        {
            Order? order = context.Order.Find(id);
            context.Order.Remove(order);
            context.SaveChanges();
        }
    }
}
