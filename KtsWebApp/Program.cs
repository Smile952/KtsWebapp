using Application.Services;
using Core.ApplicationContext;
using Core.Repository;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("localhost:3000");
                      });
});

builder.Services.AddScoped<Context>();
builder.Services.AddScoped<OrderRepository>();
builder.Services.AddKeyedScoped<OrderService>("service");
builder.Services.AddControllersWithViews();
var app = builder.Build();


app.UseStaticFiles();
app.UseCors(MyAllowSpecificOrigins);

app.Run();
