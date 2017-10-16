using LifeLine.Data;
using LifeLine.Models;
using LifeLine.Models.View;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LifeLine.Services.Providers
{
    public class CategoryViewProvider
    {
        private readonly ApplicationDbContext context;

        public CategoryViewProvider(ApplicationDbContext context)
        {
            this.context = context;
        }

        public (List<CategoryView>, List<Article>) Get(string userId)
        {
            var start = context.ArticleCategory
                .Where(t => t.UserId == userId && t.ParentId == null);

            var articles = context.Article.Where(t => t.CategoryId == null).ToList();

            List<CategoryView> list = new List<CategoryView>();

            foreach (var cate in start)
            {
                list.Add(Get(cate));
            }
            return (list, articles);
        }

        public (List<CategoryView>, List<Article>) Get2(string userId)
        {
            var start = context.ArticleCategory
                .Where(t => t.UserId == userId).ToList();

            var track = start.Select(t => {
                return (category:t, visited:false);
            }).ToArray();

            var articles = context.Article.Where(t => t.CategoryId == null).ToList();

            List<CategoryView> list = new List<CategoryView>();
            List<int> waitGo = new List<int>();

            for (int i=0;i<track.Length;i++)
            {
                var item = track[i];
                if (item.visited) continue;
                if (item.category.ParentId == null)
                {
                    item.visited = true;
                    waitGo.Add(i);
                }
            }
            foreach (var index in waitGo)
            {
                list.Add(Get2(track[index].category, track));
            }
            return (list, articles);
        }

        public CategoryView Get2(ArticleCategory cate, (ArticleCategory category,bool visited)[] track)
        {
            
            var articles = context.Article.Where(t => t.CategoryId == cate.Id).ToList();

            List<CategoryView> list = new List<CategoryView>();
            List<int> waitGo = new List<int>();

            for (int i = 0; i < track.Length; i++)
            {
                var item = track[i];
                if (item.visited) continue;
                if (item.category.ParentId == cate.Id)
                {
                    item.visited = true;
                    waitGo.Add(i);
                }
            }
            foreach (var index in waitGo)
            {
                list.Add(Get2(track[index].category, track));
            }

            return new CategoryView
            {
                Category = cate,
                SubCategories = list,
                Articles = articles
            };
        }


        public CategoryView Get(ArticleCategory cate)
        {
            var start = context.ArticleCategory
                .Where(t => t.ParentId == cate.Id).ToList();

            List<CategoryView> list = new List<CategoryView>();

            var articles = context.Article.Where(t => t.CategoryId == cate.Id).ToList();

            foreach (var item in start)
            {
                list.Add(Get(item));
            }

            return new CategoryView
            {
                Category = cate,
                SubCategories = list,
                Articles = articles
            };
        }

        public void Show((List<CategoryView> view, List<Article> articles) root)
        {
            int offset = 0;
            string offsetStr = GetOffsetLine(offset);

            offset += 2;
            foreach (var item in root.view)
            {
                Show(item,offset);
            }
            foreach (var item in root.articles)
            {
                Console.WriteLine($"{offsetStr}-C-{item.Title}");
            }
        }

        public void Show(CategoryView view,int offset=2)
        {
            string offsetStr = GetOffsetLine(offset);
            offset += 2;

            Console.WriteLine($"{offsetStr}-C-{view.Category.Name}");
            foreach (var item in view.SubCategories)
            {
                Show(item,offset);
            }
            foreach (var item in view.Articles)
            {
                Console.WriteLine($"{offsetStr}-M-{item.Title}");
            }
        }

        private string GetOffsetLine(int offset)
        {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < offset; i++)
            {
                sb.Append("-");
            }
            return sb.ToString();
        }
    }
}
