using Application.Services;
using Core.ApplicationContext;
using Core.Repository;

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
builder.Services.AddKeyedScoped<OrderService>("service");
builder.Services.AddControllers();

var app = builder.Build();
app.UseRouting(); // Добавляем маршрутизацию
app.UseCors(cors); // CORS после маршрутизации
app.UseStaticFiles();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); // Подключаем контроллеры
});

app.Run();
