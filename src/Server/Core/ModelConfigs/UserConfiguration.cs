using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.ModelConfigs
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> modelBuilder)
        {
            modelBuilder.HasKey(x => x.Id);
                        
            modelBuilder.HasMany(x => x.Orders)
                        .WithOne(x => x.User);
            
            modelBuilder.HasOne(x => x.Permission)
                        .WithMany(x => x.User)
                        .OnDelete(DeleteBehavior.Restrict);
            
            modelBuilder.HasIndex(x => x.PermissionId)
                        .IsUnique(false);

            modelBuilder.HasMany(x => x.SendedMessages)
                        .WithOne(x => x.Sender)
                        .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.HasMany(x => x.ReceivedMessages)
                        .WithOne(x => x.Receiver)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Property(e => e.Id)
                        .UseIdentityColumn(1, 1);
        }
    }
}
