using Application.Services;
using Core.ApplicationContext;
using Core.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DotNetEnv;
using Interface.Providers;
using Microsoft.EntityFrameworkCore;
using Interface;
using System.Reflection.Metadata.Ecma335;

internal class Program
{
    private static void Main(string[] args)
    {
        string directory = Directory.GetParent(Directory.GetParent(Directory.GetParent(Directory.GetCurrentDirectory()).FullName).FullName).FullName;

        Env.Load(directory + "/.env");


        string token = Env.GetString("TOKEN");
        string addr = Env.GetString("LISTENING_ADDR");

        string db_addr = Env.GetString("DATABASE_ADDR");
        string db_user = Env.GetString("DATABASE_USER");
        string db_password = Env.GetString("DATABASE_PASSWORD");

        var cors = "_myAllowSpecificOrigins";
        var builder = WebApplication.CreateBuilder(args);

        string connectionString = $"Server={db_addr},1433;TrustServerCertificate=true;Database=KTS;User Id=sa;Password=1qaz@WSX";

        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: cors,
                policy =>
                {
                    policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
        });

        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true, 
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(token)) 
            };
        });

        builder.Services.AddAuthorization();
        
        builder.Services.AddScoped<TokenProvider>();

        builder.Services.AddScoped(typeof(Context), provider => new Context(connectionString));

        builder.Services.AddScoped<RedisHandler>();

        builder.Services.AddScoped<OrderRepository>();
        builder.Services.AddKeyedScoped<OrderService>("order_service");

        builder.Services.AddScoped<UserRepository>();
        builder.Services.AddKeyedScoped<UserService>("user_service");

        builder.Services.AddScoped<EmployeeRepository>();
        builder.Services.AddKeyedScoped<EmployeeService>("employee_service");

        builder.Services.AddControllers();

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.WebHost.UseUrls(addr);

        var app = builder.Build();

        app.UseCors(cors);
        
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseRouting();


        app.UseAuthentication();
        app.UseAuthorization();
        app.UseEndpoints(endpoint =>
        {
            endpoint.MapControllers();
        });

        
        app.Run();
    }
}