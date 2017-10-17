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
    public class EditModel : PageModel
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
            int articleId)
        {
            var article = context.Article.SingleOrDefault(t => t.Id == articleId);
            this.Input = new InputModel
            {
                Title = article.Title,
                CategoryId = article.CategoryId,
                Content = article.Content
            };
        }

        public IActionResult OnPost(
            [FromServices]UserManager<ApplicationUser> userManager,
            [FromServices]ArticleService service,
            int articleId)
        {
            ViewData["Success"] = false;
            try
            {
                var userId = userManager.GetUserId(User);
                service.Edit(articleId,Input.Title, Input.Content, userId);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("error", "修改出错");
            }
            ViewData["Success"] = true;
            return Page();
        }
    }
}