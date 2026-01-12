using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.ModelConfigs
{
    internal class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> modelBuilder)
        {
            modelBuilder.HasKey(x => x.Id);
            
            modelBuilder.HasMany(x => x.Orders)
                            .WithOne(x => x.Employee);
            
            modelBuilder.HasOne(x => x.Permission)
                        .WithMany(x => x.Employee)
                        .OnDelete(DeleteBehavior.Restrict);
            
            modelBuilder.HasIndex(x => x.PermissionId)
                        .IsUnique(false);
            
            modelBuilder.Property(e => e.Id).UseIdentityColumn(1, 1);
        }
    }
}
