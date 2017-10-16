using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using LifeLine.Data;
using LifeLine.Models;
using LifeLine.Services;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace LifeLine.Pages.Article
{
    public class AddModel : PageModel
    {
        public class InputModel
        {
            [Required]
            public string Title { get; set; }
            public string Content { get; set; }
            public int? CategoryId { get; set; }
        }

        [BindProperty]
        public InputModel Input { get; set; }
        public ArticleCategory Category { get; set; }

        public void OnGet(
            [FromServices]ApplicationDbContext context,
            int? categoryId)
        {
            if (categoryId != null)
            {
                this.Category = context.ArticleCategory.SingleOrDefault(t => t.Id == categoryId);
            }
        }

        public IActionResult OnPost(
            [FromServices]UserManager<ApplicationUser> userManager,
            [FromServices]ArticleService service)
        {
            ViewData["Success"] = false;
            try
            {
                var userId = userManager.GetUserId(User);
                service.Add(Input.Title, Input.Content, Input.CategoryId,userId);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("error", "ºÏ≤È ‰»Î");
            }
            ViewData["Success"] = true;
            return Page();
        }
    }
}