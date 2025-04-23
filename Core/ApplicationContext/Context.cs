using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Core.ApplicationContext
{
    public class Context : DbContext
    {
        public DbSet<Order> Order { get; set; }
        public DbSet<OrdersTypeEnum> OrdersTypeEnum { get; set; }
        public DbSet<Employee> Employee {get; set;}
        public DbSet<User> User {get; set;}
        public DbSet<OrderStatus> OrderStatus { get; set; }

        public Context()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var configuration = new ConfigurationBuilder()
              .AddJsonFile("dbConfig.json")
              .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            optionsBuilder.UseSqlServer(connectionString);
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Employee>().HasKey(x => x.Id);
            modelBuilder.Entity<Order>().HasKey(x => x.Id);
            modelBuilder.Entity<OrdersTypeEnum>().HasKey(x => x.Id);
            modelBuilder.Entity<User>().HasKey(x => x.Id);
            modelBuilder.Entity<OrderStatus>().HasKey(x => x.Id);

            modelBuilder.Entity<Employee>().HasMany(x => x.Orders).WithOne(x => x.Employee);
            modelBuilder.Entity<Order>().HasOne(x => x.Employee).WithMany(x => x.Orders);
            modelBuilder.Entity<Order>().HasOne(x => x.User).WithMany(x => x.Orders);
            modelBuilder.Entity<Order>().HasOne(x => x.OrdersTypeEnum).WithMany(x => x.Orders);
            modelBuilder.Entity<OrdersTypeEnum>().HasMany(x => x.Orders).WithOne(x => x.OrdersTypeEnum);
            modelBuilder.Entity<User>().HasMany(x => x.Orders).WithOne(x => x.User);
            modelBuilder.Entity<Order>().HasOne(x => x.OrderStatus).WithMany(x => x.Orders);

            base.OnModelCreating(modelBuilder);
        }
    }
}
