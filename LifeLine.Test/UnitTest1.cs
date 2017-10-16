using LifeLine.Data;
using LifeLine.Models;
using LifeLine.Services.Providers;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq;

namespace LifeLine.Test
{
    [TestClass]
    public class UnitTest1
    {
        static string connStr = "Server=(localdb)\\mssqllocaldb;Database=aspnet-LifeLine-53bc9b9d-9d6a-45d4-8429-2a2761773502;Trusted_Connection=True;MultipleActiveResultSets=true";

        static ApplicationDbContext GetDbContext()
        {
            DbContextOptions options = new DbContextOptionsBuilder().UseSqlServer(connStr).Options;
            return new ApplicationDbContext(options);
        }

        [TestMethod]
        public void TestMethod1()
        {
            DbContextOptions options = new DbContextOptionsBuilder().UseSqlServer(connStr).Options;
            ApplicationDbContext context = new ApplicationDbContext(options);
            var sheet = context.SongCollection.SingleOrDefault(t=>t.Id==1);

            for(int i=0; i<4;i++)
            {
                var song = new Song
                {
                    Title = $"song0{i}",
                    Path = $"/songs/song{i+1}.mp3",
                    UploadFileName = "test"
                };
                context.Song.Add(song);
                SongCollectionMap map = new SongCollectionMap { SongId = song.Id, SongCollectionId = sheet.Id };
                context.SongCollectionMap.Add(map);
                context.SaveChanges();
            }
        }

        [TestMethod]
        public void TestArticle()
        {
            var context = UnitTest1.GetDbContext();
            var userId = "ce2b60e1-1ad0-4f89-bb32-90e99e812467";
            CategoryViewProvider cp = new CategoryViewProvider(context);
            cp.Show(cp.Get(userId));
        }

        [TestMethod]
        public void TestArticle2()
        {
            var context = UnitTest1.GetDbContext();
            var userId = "ce2b60e1-1ad0-4f89-bb32-90e99e812467";
            CategoryViewProvider cp = new CategoryViewProvider(context);
            cp.Show(cp.Get2(userId));
        }
    }
}
