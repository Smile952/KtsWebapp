using Core.ApplicationContext;
using Core.Interfaces;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Core.Repository
{
    public class MessageRepository : IRepository<Message>
    {
        Context context;
        public MessageRepository(Context context)
        {
            this.context = context;
        }

        public void Create(Message dto)
        {
            context.Message.Add(dto);
            context.SaveChanges();
        }

        public void Delete(int id)
        {
            Message? message = context.Message.Find(id);
            context.Message.Remove(message);
            context.SaveChanges();
        }

        public IEnumerable<Message> Read()
        {
            return context.Message.ToList();
        }

        public Message? ReadById(int id)
        {
            return context.Message.Find(id);
        }

        public void Update(Message dto)
        {
            context.Message
                .Where(x => x.Id == dto.Id)
                .ExecuteUpdate(messages => messages
                    .SetProperty(x => x.IsReaded, dto.IsReaded)
                    .SetProperty(x => x.Text, dto.Text));
        }
    }
}