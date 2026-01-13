using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.ModelConfigs
{
    internal class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> modelBuilder)
        {
            modelBuilder.HasKey(x => x.Id);
            
            modelBuilder.HasOne(x => x.Employee)
                        .WithMany(x => x.Orders);
            
            modelBuilder.HasOne(x => x.User)
                        .WithMany(x => x.Orders);
            
            modelBuilder.HasOne(x => x.OrdersTypeEnum)
                        .WithMany(x => x.Orders);
            
            modelBuilder.HasOne(x => x.OrderStatus)
                        .WithMany(x => x.Orders);

            modelBuilder.Property(e => e.Id)
                        .UseIdentityColumn(1, 1);
        }
    }
}
