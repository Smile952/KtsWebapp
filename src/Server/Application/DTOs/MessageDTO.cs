using Microsoft.Identity.Client;

namespace Application.DTOs
{
    public record MessageDTO
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public bool IsReaded { get; set; }
        public DateTime SendedAt { get; set; }
    }
}
