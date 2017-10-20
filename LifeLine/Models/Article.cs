using LifeLine.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LifeLine.Models
{
    public class Article
    {
        public Article() { }

        public Article(string title, string content, int? categoryId)
        {
            Title = title;
            Content = content;
            CategoryId = categoryId;
        }

        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime LastModifyTime { get; set; }
        [Required]
        public string UserId { get; set; }
        public int? CategoryId { get; set; }

        public ApplicationUser User { get; set; }
        public ArticleCategory Category { get; set; }
    }
}
