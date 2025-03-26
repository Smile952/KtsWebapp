using Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Core.ApplicationContext
{
    public class Context : DbContext
    {
        public DbSet<Order> Order { get; set; }
        public DbSet<OrdersTypeEnum> OrdersTypeEnum { get; set; }
        public DbSet<Employee> Employee {get; set;}
        public DbSet<User> User {get; set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=DESKTOP-6KQLPSL;TrustServerCertificate=true;Database=KTS;User Id=DESKTOP-6KQLPSL\\Kheragacy;Integrated Security=True");
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Employee>()
                .HasKey(x => x.Id);
            modelBuilder.Entity<Order>()
                .HasKey(x => x.Id);
            modelBuilder.Entity<OrdersTypeEnum>()
                .HasKey(x => x.Id);
            modelBuilder.Entity<User>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<Employee>()
                .HasMany(x => x.Orders)
                .WithOne(x => x.Employee);
            modelBuilder.Entity<Order>()
                .HasOne(x => x.Employee)
                .WithMany(x => x.Orders);
            modelBuilder.Entity<Order>()
                .HasOne(x => x.User)
                .WithMany(x => x.Orders);
            modelBuilder.Entity<Order>()
                .HasOne(x => x.OrdersTypeEnum)
                .WithMany(x => x.Orders);
            modelBuilder.Entity<OrdersTypeEnum>()
                .HasMany(x => x.Orders)
                .WithOne(x => x.OrdersTypeEnum);
            modelBuilder.Entity<User>()
                .HasMany(x => x.Orders)
                .WithOne(x => x.User);

            modelBuilder.Entity<User>()
                .HasIndex(x => x.Email)
                .IsUnique();

            base.OnModelCreating(modelBuilder);
        }
    }
}
