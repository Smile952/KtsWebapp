using Application.DTOs;

namespace Interface.Models
{
    public class OrderModel
    {
        public string UserId { get; set; } = string.Empty;
        public string EmployeeId { get; set; } = string.Empty;
        public string OrderTypeId { get; set; } = string.Empty;
        public string OrderContent { get; set; } = string.Empty;
        public string OrderStatusId { get; set; } = string.Empty;

        public bool IsAllData()
        {
            if (UserId != null && EmployeeId != null && OrderTypeId != null && OrderContent != null && OrderStatusId != null)
            {
                return true;
            }
            return false;
        }
        public bool IsPartialData()
        {
            if (UserId != null || EmployeeId != null || OrderTypeId != null || OrderContent != null || OrderStatusId != null)
            {
                return true;
            }
            return false;
        }

        public OrderDTO SetRequestData(OrderDTO request)
        {
            if (UserId != null) request.userId = Int32.Parse(UserId);
            if (EmployeeId != null) request.EmployeeId = Int32.Parse(EmployeeId);
            if (OrderTypeId != null) request.OrderTypeId = Int32.Parse(OrderTypeId);
            if (OrderContent != null) request.OrderContent = OrderContent;
            if (OrderStatusId != null) request.OrderStatusId = Int32.Parse(OrderStatusId);

            return request;
        }
    }
}
