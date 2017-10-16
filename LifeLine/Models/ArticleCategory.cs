using LifeLine.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LifeLine.Models
{
    public class ArticleCategory
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int? ParentId { get; set; }
        [Required]
        [ForeignKey("User")]
        public string UserId { get; set; }

        public ApplicationUser User { get; set; }
        [ForeignKey("ParentId")]
        public virtual ICollection<ArticleCategory> SubCategories { get; set; }
        public virtual ICollection<Article> Articles { get; set; }
    }
}
