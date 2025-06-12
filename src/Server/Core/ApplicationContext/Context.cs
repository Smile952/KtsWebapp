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
        public DbSet<Permissions> Permissions { get; set; }

        public Context(string connectionString)
        {
            Database.SetConnectionString(connectionString);
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
            //Сотрудники
            modelBuilder.Entity<Employee>()
                            .HasKey(x => x.Id);
            modelBuilder.Entity<Employee>()
                            .HasMany(x => x.Orders)
                            .WithOne(x => x.Employee);
            modelBuilder.Entity<Employee>()
                            .HasOne(x => x.Permission)
                            .WithMany(x => x.Employee)
                            .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Employee>().HasIndex(x => x.PermissionId).IsUnique(false);
            

            //Перечисление типов заказов
            modelBuilder.Entity<OrdersTypeEnum>()
                            .HasKey(x => x.Id);
            modelBuilder.Entity<OrdersTypeEnum>()
                           .HasMany(x => x.Orders)
                           .WithOne(x => x.OrdersTypeEnum);

            //Пользователи
            modelBuilder.Entity<User>()
                            .HasKey(x => x.Id);
            modelBuilder.Entity<User>()
                           .HasMany(x => x.Orders)
                           .WithOne(x => x.User);
            modelBuilder.Entity<User>()
                            .HasOne(x => x.Permission)
                            .WithMany(x => x.User)
                            .OnDelete(DeleteBehavior.Restrict); ;
            modelBuilder.Entity<User>().HasIndex(x => x.PermissionId).IsUnique(false);

            //Перечисление статусов заказов
            modelBuilder.Entity<OrderStatus>()
                            .HasKey(x => x.Id);
           
            //Заказы
            modelBuilder.Entity<Order>()
                            .HasKey(x => x.Id);
            modelBuilder.Entity<Order>()
                            .HasOne(x => x.Employee)
                            .WithMany(x => x.Orders);
            modelBuilder.Entity<Order>()
                            .HasOne(x => x.User)
                            .WithMany(x => x.Orders);
            modelBuilder.Entity<Order>()
                            .HasOne(x => x.OrdersTypeEnum)
                            .WithMany(x => x.Orders);
            modelBuilder.Entity<Order>()
                            .HasOne(x => x.OrderStatus)
                            .WithMany(x => x.Orders);

            //Статусы
            modelBuilder.Entity<OrderStatus>()
                            .HasKey(x => x.Id);
            modelBuilder.Entity<OrderStatus>()
                            .HasMany(x => x.Orders)
                            .WithOne(x => x.OrderStatus);

            //Права доступа
            modelBuilder.Entity<Permissions>()
                            .HasKey(x => x.Id);
            modelBuilder.Entity<Permissions>().HasData(
                new Permissions { Id = 1, Name="Public"},
                new Permissions { Id = 2, Name="User"},
                new Permissions { Id = 3, Name="Private"}
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}
