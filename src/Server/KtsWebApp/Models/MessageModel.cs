namespace KTS.Models
{
    public class MessageModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public bool IsReaded { get; set; }
        public DateTime SendedAt { get; set; }

        public bool IsALlData()
        {
            if(Text != null)
            {
                return true;
            }
            return false;
        }
    }
}
