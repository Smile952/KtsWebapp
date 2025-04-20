using Application.Services;
using Core.ApplicationContext;
using Core.Repository;
using Interface;



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

builder.Services.AddScoped<Context>();

builder.Services.AddScoped<OrderRepository>();
builder.Services.AddKeyedScoped<OrderService>("order_service");

builder.Services.AddScoped<UserRepository>();
builder.Services.AddKeyedScoped<UserService>("user_service");

builder.Services.AddScoped<EmployeeRepository>();
builder.Services.AddKeyedScoped<EmployeeService>("employee_service");

builder.Services.AddControllers();

var app = builder.Build();

app.UseRouting(); 
app.UseCors(cors); 
app.UseStaticFiles();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); 
});

app.Run();
