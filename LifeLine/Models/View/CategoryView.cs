using LifeLine.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace LifeLine.Models.View
{
    public class CategoryView
    {
        public ArticleCategory Category { get; set; }
        public ICollection<Article> Articles { get; set; }
        public ICollection<CategoryView> SubCategories { get; set; }

        
    }

}
