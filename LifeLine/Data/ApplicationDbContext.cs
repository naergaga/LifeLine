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
            builder.Entity<SongCollection>().HasIndex(p => new { p.Name}).IsUnique();
            builder.Entity<SongCollectionMap>().HasKey(p => new { p.SongId, p.SongCollectionId });
        }

        public DbSet<Song> Song { get; set; }
        public DbSet<SongCollection> SongCollection { get; set; }
        public DbSet<SongCollectionMap> SongCollectionMap { get; set; }
        public DbSet<Article> Article { get; set; }
        public DbSet<ArticleCategory> ArticleCategory { get; set; }
    }
}
