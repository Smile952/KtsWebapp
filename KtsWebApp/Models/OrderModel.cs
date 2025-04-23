using Application.DTOs;

namespace Interface.Models
{
    public class OrderModel
    {
        public int UserId { get; set; }
        public int EmployeeId { get; set; }
        public int OrderTypeId { get; set; }
        public string OrderContent { get; set; } = string.Empty;
        public int OrderStatusId { get; set; }

        public bool IsAllData()
        {
            if (UserId >= 0 && EmployeeId >= 0 && OrderTypeId >= 0 && OrderContent != null && OrderStatusId >= 0)
            {
                return true;
            }
            return false;
        }
        public bool IsPartialData()
        {
            if (UserId >= 0 || EmployeeId >= 0 || OrderTypeId >= 0 || OrderContent != null || OrderStatusId >= 0)
            {
                return true;
            }
            return false;
        }

        public OrderDTO SetRequestData(OrderDTO request)
        {
            if (UserId >= 0) request.userId = UserId;
            if (EmployeeId >= 0) request.EmployeeId = EmployeeId;
            if (OrderTypeId >= 0) request.OrderTypeId = OrderTypeId;
            if (OrderContent != null) request.OrderContent = OrderContent;
            if(OrderStatusId >= 0) request.OrderStatusId = OrderStatusId;

            return request;
        }
    }
}
