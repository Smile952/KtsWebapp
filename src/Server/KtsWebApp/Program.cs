using Application.Services;
using Core.ApplicationContext;
using Core.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DotNetEnv;
using Infrastucture;

internal class Program
{
    private static void Main(string[] args)
    {
        string directory = Directory.GetCurrentDirectory();

        string envPath = Path.Combine(directory, ".env");
        string secretKey, addr, db_addr, db_user, db_password;
        Env.Load(directory + "/.env");

        secretKey = Env.GetString("SECRET_KEY");
        addr = Env.GetString("LISTENING_ADDR");

        db_addr = Env.GetString("DATABASE_ADDR");
        db_user = Env.GetString("DATABASE_USER");
        db_password = Env.GetString("DATABASE_PASSWORD");

        var cors = "_myAllowSpecificOrigins";
        var builder = WebApplication.CreateBuilder(args);
        var a = Environment.GetEnvironmentVariables();
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
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                ClockSkew = TimeSpan.Zero
            };
        });

        builder.Services.AddAuthorization();
        
        builder.Services.AddScoped(typeof(Context), provider => new Context(connectionString));

        builder.Services.AddScoped<OrderRepository>();
        builder.Services.AddKeyedScoped<OrderService>("order_service");

        builder.Services.AddScoped<UserRepository>();
        builder.Services.AddKeyedScoped<UserService>("user_service");

        builder.Services.AddScoped<EmployeeRepository>();
        builder.Services.AddKeyedScoped<EmployeeService>("employee_service");

        builder.Services.AddSingleton<PasswordHasher>();

        builder.Services.AddScoped(typeof(TokenBuilder), service => new TokenBuilder(secretKey));

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
        app.MapControllers();

        
        app.Run();
    }
}