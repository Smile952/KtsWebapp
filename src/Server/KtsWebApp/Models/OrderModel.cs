using Application.DTOs;

namespace Interface.Models
{
    public class OrderModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; } = string.Empty;
        public int OrderTypeId { get; set; }
        public string OrderTypeName { get; set; } = string.Empty;   
        public int OrderStatusId { get; set; }
        public string OrderStatusName { get; set; } = string.Empty;



        public bool IsAllData()
        {
            if (UserId != null && EmployeeId != null && OrderTypeId != null  && OrderStatusId != null)
            {
                return true;
            }
            return false;
        }
        public bool IsPartialData()
        {
            if (UserId != null || EmployeeId != null || OrderTypeId != null  || OrderStatusId != null)
            {
                return true;
            }
            return false;
        }

        public OrderDTO SetRequestData(OrderDTO request)
        {
            if (UserId != null) request.userId = UserId;
            if (EmployeeId != null) request.EmployeeId = EmployeeId;
            if (OrderTypeId != null) request.OrderTypeId = OrderTypeId;
            if (OrderStatusId != null) request.OrderStatusId = OrderStatusId;

            return request;
        }

        public OrderModel getJsonOrderModel()
        {
            return null;
        }
    }
}
