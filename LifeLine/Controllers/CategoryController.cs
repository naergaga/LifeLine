﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LifeLine.Services.Providers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using LifeLine.Data;
using LifeLine.Models.View;
using LifeLine.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LifeLine.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class CategoryController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IActionResult Get(
            [FromServices] CategoryViewProvider provider,
            [FromServices] UserManager<ApplicationUser> userManager
        )
        {
            var id = userManager.GetUserId(User);
            var item = provider.Get(id);
            return Json(new
            {
                SubCategories = item.Item1,
                Articles = item.Item2
            });
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Article Get([FromServices]ApplicationDbContext context, int id)
        {
            return context.Article.SingleOrDefault(t => t.Id == id);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post(
            [FromServices]UserManager<ApplicationUser> userManager, 
            [FromServices]ApplicationDbContext context, 
            int parentId, string name)
        {
            var userId = userManager.GetUserId(User);
            var result = context.ArticleCategory.Add(new ArticleCategory
            {
                Name = name,
                ParentId = parentId,
                UserId = userId
            });
            context.SaveChanges();
            return Json(result.Entity);
        }

        [HttpPost("Move")]
        public IActionResult Move(
            [FromServices]UserManager<ApplicationUser> userManager,
            [FromServices]ApplicationDbContext context,
            int categoryId, int articleId)
        {
            var userId = userManager.GetUserId(User);
            var article = context.Article.SingleOrDefault(t => t.Id == articleId);
            article.CategoryId = categoryId;
            context.Update(article);
            context.SaveChanges();
            return Json(article);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(
            [FromServices]ApplicationDbContext context,
            [FromServices]UserManager<ApplicationUser> userManager, 
            int id, string name)
        {
            var userId = userManager.GetUserId(User);
            var item = context.ArticleCategory.SingleOrDefault(t => t.Id == id);
            if (item == null || userId != item.UserId)
            {
                return BadRequest();
            }
            item.Name = name;
            context.Update(item);
            context.SaveChanges();
            return Ok();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(
            [FromServices]ApplicationDbContext context,
            [FromServices]UserManager<ApplicationUser> userManager,
            int id)
        {
            var item = context.ArticleCategory.SingleOrDefault(t => t.Id == id);
            if (item.UserId == userManager.GetUserId(User))
            {
                context.ArticleCategory.Remove(item);
                context.SaveChanges();
                return NoContent();
            } else
            {
                return BadRequest(new { message = "Permission denied" });
            }
        }
    }
}