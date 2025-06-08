using Application.Services;
using Core.ApplicationContext;
using Core.Repository;
using Interface;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using System.Text;

internal class Program
{
    private static void Main(string[] args)
    {
        var cors = "_myAllowSpecificOrigins";
        var builder = WebApplication.CreateBuilder(args);

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
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("53db4fdf8da5212b2896c62a738794c35fb9ba73c8b6d9adc73a489ba1241149e1f569a2e244c244e8a5ae6b5de5fea6c12e4c190b9c0178b274a52e0bf62680")) 
            };
        });

        builder.Services.AddAuthorization();


        builder.Services.AddScoped<Context>();

        builder.Services.AddScoped<TokenProvider>();

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

        var app = builder.Build();
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
            endpoint.MapControllerRoute(
                name: "default",
                pattern: "swagger/index.html",
                defaults: null
                );
        });

        app.UseCors(cors);
        
        app.Run();
    }
}