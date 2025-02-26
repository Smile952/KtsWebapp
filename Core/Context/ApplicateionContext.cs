using Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Core.Context
{
    class ApplicateionContext : DbContext
    {
        public ApplicateionContext(DbContextOptions<ApplicateionContext> context) : base(context)
        {

        }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer();
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().HasKey(x => x.Id);
            modelBuilder.Entity<Order>().HasKey(x => x.Id);
            modelBuilder.Entity<User>().HasKey(x => x.Id);

            modelBuilder.Entity<Employee>().HasMany(x => x.Orders).WithOne(x => x.Employee);
            modelBuilder.Entity<User>().HasMany(x => x.Orders).WithOne(x => x.User);
        }
    }
}
