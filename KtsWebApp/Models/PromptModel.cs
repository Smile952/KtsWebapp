using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Interface.Models
{
    public class PromptModel : PageModel
    {
        public int Message { get; set; }
        public void OnGet(int i)
        {
            Message = i;
        }
    }
}
