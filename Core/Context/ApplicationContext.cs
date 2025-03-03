using Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Core.Context
{
    class ApplicationContext : DbContext
    {
        public DbSet<Employee> Employee { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=DESKTOP-6KQLPSL;TrustServerCertificate=true;Database=KTS;User Id=DESKTOP-6KQLPSL\\Kheragacy; Trusted_Connection=true");
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrdersTypeEnum>().HasKey(x => x.Id);
            modelBuilder.Entity<Employee>().HasKey(x => x.Id);
            modelBuilder.Entity<Order>().HasKey(x => x.Id);
            modelBuilder.Entity<User>().HasKey(x => x.Id);

            modelBuilder.Entity<OrdersTypeEnum>()
                                .HasMany(x => x.Orders)
                                .WithOne(x => x.OrdersTypeEnum);
            modelBuilder.Entity<Employee>()
                                .HasMany(x => x.Orders)
                                .WithOne(x => x.Employee);
            modelBuilder.Entity<User>()
                                .HasMany(x => x.Orders)
                                .WithOne(x => x.User);
        }
    }
}
