using LifeLine.Data;
using LifeLine.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LifeLine.Services
{
    public class ArticleService
    {
        private readonly ApplicationDbContext _context;

        public ArticleService(ApplicationDbContext context)
        {
            _context = context;
        }

        public Article Add(string title, string content, int? categoryId, string userId)
        {
            Article article = new Article(title, content, categoryId);
            article.UserId = userId;
            article.LastModifyTime = article.CreateTime = DateTime.Now;

            this._context.Add(article);
            _context.SaveChanges();
            return article;
        }
    }
}
