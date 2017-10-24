using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using LifeLine.Models;

namespace LifeLine.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<SongCollectionMap>().HasIndex(p => new { p.SongId, p.SongCollectionId }).IsUnique();
            builder.Entity<SongCollectionMap>().HasKey(p => new { p.SongId, p.SongCollectionId });

            builder.Entity<SongCollection>().HasIndex(p => new { p.Name }).IsUnique();

            //Íâ¼ü
            builder.Entity<ArticleCategory>()
                .HasOne(ac => ac.ParentCategory)
                .WithMany(pc => pc.SubCategories)
                .HasForeignKey(ac => ac.ParentId);

            builder.Entity<Article>()
                .HasOne(a => a.Category)
                .WithMany(c => c.Articles)
                .HasForeignKey(a => a.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Article>()
                .HasOne(a => a.User)
                .WithMany(c => c.Articles)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        public DbSet<Song> Song { get; set; }
        public DbSet<SongCollection> SongCollection { get; set; }
        public DbSet<SongCollectionMap> SongCollectionMap { get; set; }
        public DbSet<Article> Article { get; set; }
        public DbSet<ArticleCategory> ArticleCategory { get; set; }
        public DbSet<UpImage> UpImage { get; set; }

        public void DeleteArticleCategory(ArticleCategory entity)
        {
            var target = this.ArticleCategory
                .Include(x => x.SubCategories)
                .Include(x => x.Articles)
                .FirstOrDefault(x => x.Id == entity.Id);

            RecursiveDelete(target);

            SaveChanges();

        }

        private void RecursiveDelete(ArticleCategory parent)
        {
            if (parent.SubCategories != null)
            {
                var children = ArticleCategory
                    .Include(x => x.SubCategories)
                    .Include(x => x.Articles)
                    .Where(x => x.ParentId == parent.Id);

                foreach (var child in children)
                {
                    RecursiveDelete(child);
                }
            }

            foreach (var item in parent.Articles)
            {
                Article.Remove(item);
            }

            ArticleCategory.Remove(parent);
        }
    }
}
