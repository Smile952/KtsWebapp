namespace Core.Models
{
    public class Message
    {
        public int Id { get; set; }
        
        public string Text { get; set; }
        
        public int SenderId { get; set; }
        public User Sender { get; set; }
        
        public int ReceiverId { get; set; }
        public User Receiver { get; set; }
    
        public DateTime SendedAt { get; set; }

        public bool IsReaded { get; set; }
    }
}
