using Application.Services;
using Core.ApplicationContext;
using Core.Repository;
using Infrastucture;
using KTS.Configuration;

namespace KTS.Extensions
{
    public static class WebApplicaionBuilderExtensions
    {

        public static void AddServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddCorsService();
        }
        public static void AddCustomServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped(typeof(Context), provider => new Context(EnvConfiguration.ConnectionString));

            builder.Services.AddScoped<OrderRepository>();
            builder.Services.AddKeyedScoped<OrderService>("order_service");

            builder.Services.AddScoped<UserRepository>();
            builder.Services.AddKeyedScoped<UserService>("user_service");

            builder.Services.AddScoped<EmployeeRepository>();
            builder.Services.AddKeyedScoped<EmployeeService>("employee_service");

            builder.Services.AddSingleton<PasswordHasher>();

            builder.Services.AddScoped(typeof(TokenBuilder), service => new TokenBuilder(EnvConfiguration.SecretKey));
        }
    }
}
