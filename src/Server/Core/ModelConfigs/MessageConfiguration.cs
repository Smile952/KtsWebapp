using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.ModelConfigs
{
    internal class MessageConfiguration : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.Sender).WithMany(x => x.SendedMessages);

            builder.HasOne(x => x.Receiver).WithMany(x => x.ReceivedMessages);

            builder.Property(x => x.Id)
                   .UseIdentityColumn(1, 1);
        }
    }
}
