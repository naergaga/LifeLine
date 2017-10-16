using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LifeLine.Data;
using Microsoft.AspNetCore.Http;
using LifeLine.Models;
using LifeLine.Services;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LifeLine.Controllers
{
    [Route("[controller]/[action]")]
    [Authorize]
    public class MusicController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Sheets([FromServices]ApplicationDbContext context)
        {
            var sheets = context.SongCollection.ToList();
            return Json(sheets);
        }

        [HttpPost("/Music/Add")]
        public async Task<IActionResult> AddAsync(
            [FromServices]ApplicationDbContext context,
            [FromServices]SongService songService,
            int sheetId,
            List<IFormFile> songs)
        {
            var sheet = context.SongCollection.SingleOrDefault(t=>t.Id==sheetId);

            if (sheet==null) return Json(new {success=false});

            foreach (var formFile in songs)
            {
                var song =  await songService.SaveSongAsync(formFile);
                context.Song.Add(song);
                context.SongCollectionMap.Add(new SongCollectionMap{
                    SongId=song.Id,
                    SongCollectionId = sheet.Id
                });
                //try
                //{
                context.SaveChanges();
                //}
                //catch
                //{
                //}
            }

            return Json(new { success = true });
        }

        [HttpDelete("/Music/{id}")]
        public IActionResult Delete(
            [FromServices]ApplicationDbContext context,
            [FromServices]SongService songService,
            int id)
        {
            var song = context.Song.SingleOrDefault(t => t.Id == id);
            if (song == null) return Json(new {success=false});
            System.IO.File.Delete(songService.GetSongPath(song.Path));
            context.Song.Remove(song);
            context.SaveChanges();
            return new NoContentResult();
        }
    }
}
