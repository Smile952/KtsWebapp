using Core.ModelConfigs;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;

namespace Core.ApplicationContext
{
    public class Context : DbContext
    {
        private string _connectionString;
        public DbSet<Order> Order { get; set; }
        public DbSet<OrdersTypeEnum> OrdersTypeEnum { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<OrderStatus> OrderStatus { get; set; }
        public DbSet<Permissions> Permissions { get; set; }
        public DbSet<Message> Message { get; set; } 

        public Context()
        {
            Database.EnsureCreated();
        }

        public Context(string connectionString)
        {
            _connectionString = connectionString;
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (string.IsNullOrEmpty(_connectionString))
            {
                var configuration = new ConfigurationBuilder()
                    .AddJsonFile("dbConfig.json")
                    .Build();

                _connectionString = configuration.GetConnectionString("DefaultConnection");
            }

            optionsBuilder.UseSqlServer(_connectionString);
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Сотрудники
            modelBuilder.ApplyConfiguration(new EmployeeConfiguration());

            //Заказы
            modelBuilder.ApplyConfiguration(new OrderConfiguration());

            //Пользователи
            modelBuilder.ApplyConfiguration(new UserConfiguration());

            //Сообщения
            modelBuilder.ApplyConfiguration(new MessageConfiguration());

            //Перечисление типов заказов
            modelBuilder.Entity<OrdersTypeEnum>()
                            .HasKey(x => x.Id);
            modelBuilder.Entity<OrdersTypeEnum>()
                           .HasMany(x => x.Orders)
                           .WithOne(x => x.OrdersTypeEnum);

            

            //Перечисление статусов заказов
            modelBuilder.Entity<OrderStatus>()
                            .HasKey(x => x.Id);

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
                new Permissions { Id = 1, Name = "Public" },
                new Permissions { Id = 2, Name = "User" },
                new Permissions { Id = 3, Name = "Private" }
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}
