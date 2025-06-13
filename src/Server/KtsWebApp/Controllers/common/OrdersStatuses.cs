namespace Interface.Controllers.common
{
    public class OrdersStatuses
    {
        public static Dictionary<int, string> orderStatuses = new Dictionary<int, string>()
        {
            {1, "draft"},
            {2, "deleted"},
            {3, "created"},
            {4, "completed"},
            {5, "completed"},
        };
    }
}
