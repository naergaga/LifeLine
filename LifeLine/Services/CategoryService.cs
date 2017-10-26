using LifeLine.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LifeLine.Services
{
    public class CategoryService
    {
        private ApplicationDbContext _context;

        public CategoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool MoveArticleToCategory(int articleId, int? categoryId, string userId)
        {
            var article = _context.Article.SingleOrDefault(t => t.UserId == userId && t.Id == articleId);
            if (article == null) return false;
            if (categoryId != null)
            {
                var category = _context.ArticleCategory.SingleOrDefault(t => t.UserId == userId && t.Id == categoryId);
                if (category == null) return false;
            }
            article.CategoryId = categoryId;
            _context.Update(article);
            _context.SaveChanges();
            return true;
        }

        public bool MoveCategoryToCategory(int subCategoryId, int? categoryId, string userId)
        {
            var subCategory = _context.ArticleCategory.SingleOrDefault(t => t.UserId == userId && t.Id == subCategoryId);
            if (subCategory == null) return false;
            if (categoryId != null)
            {
                var category = _context.ArticleCategory.SingleOrDefault(t => t.UserId == userId && t.Id == categoryId);
                if (category == null) return false;
            }
            subCategory.ParentId = categoryId;
            _context.Update(subCategory);
            _context.SaveChanges();
            return true;
        }
    }
}
