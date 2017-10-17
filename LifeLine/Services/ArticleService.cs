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

        public Article Edit(int id, string title, string content, string userId)
        {
            Article article = _context.Article.SingleOrDefault(t=>t.Id==id && t.UserId==userId);
            article.LastModifyTime  = DateTime.Now;
            article.Content = content;
            article.Title = title;

            this._context.Update(article);
            _context.SaveChanges();
            return article;
        }
    }
}
