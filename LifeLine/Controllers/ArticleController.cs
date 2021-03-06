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
    public class ArticleController : Controller
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
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(
            [FromServices]ApplicationDbContext context,
            [FromServices]UserManager<ApplicationUser> userManager, 
            int id)
        {
            
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(
            [FromServices]ApplicationDbContext context,
            [FromServices]UserManager<ApplicationUser> userManager,
            int id)
        {
            var item = context.Article.SingleOrDefault(t => t.Id == id);
            if (item.UserId == userManager.GetUserId(User))
            {
                context.Article.Remove(item);
                context.SaveChanges();
                return NoContent();
            } else
            {
                return BadRequest(new { message = "Permission denied" });
            }
        }
    }
}
