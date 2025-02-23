var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Включаем обслуживание статических файлов
app.UseStaticFiles();

app.MapGet("/", async context =>
{
    context.Response.ContentType = "text/html";
    await context.Response.SendFileAsync("wwwroot/Pages/views/html/TypesOfDevelopment.html");
});

app.MapGet("/r", async context =>
{
    context.Response.ContentType = "text/html";
    await context.Response.SendFileAsync("wwwroot/Pages/views/html/Requests.html");
});

app.Run();