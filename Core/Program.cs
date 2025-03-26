using Core.ApplicationContext;

class Program
{
    static void Main(string[] args)
    {
        using (Context context = new Context())
        {
            Console.WriteLine(context.Order);
        }
    }
}