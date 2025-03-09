using Application.Services;
using Core.ApplicationContext;
using Core.Repository;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<Context>();
builder.Services.AddScoped<OrderRepository>();
builder.Services.AddKeyedScoped<OrderService>("service");
builder.Services.AddControllersWithViews();
var app = builder.Build();


app.UseStaticFiles();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
