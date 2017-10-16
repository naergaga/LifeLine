using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LifeLine.Data;
using LifeLine.Models;
using Microsoft.AspNetCore.Authorization;
using LifeLine.Models.Json;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LifeLine.Controllers
{
    [Route("/Sheet")]
    [Authorize]
    public class SheetController : Controller
    {

        [HttpGet("")]
        public IActionResult GetList([FromServices]ApplicationDbContext context,
                int currentPage,
                int pageSize,
                 int id)
        {
            var sheet = context.SongCollection.SingleOrDefault(t => t.Id == id);
            var songs = from sm in context.SongCollectionMap
                        join s in context.Song on sm.SongId equals s.Id
                        where sm.SongCollectionId == id
                        select s;
            if (sheet == null) return NotFound();
            return Json(new SheetPage
            {
                Id = sheet.Id,
                CurrentPage = currentPage,
                PageSize = pageSize,
                TotalPage = (int)Math.Ceiling(songs.Count() / (double)pageSize),
                Songs = songs.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList()
            });
        }

        [HttpPost]
        public IActionResult Add([FromServices]ApplicationDbContext context, string name)
        {
            var song = context.SongCollection.Add(new SongCollection { Name = name });
            try
            {
                context.SaveChanges();
            }
            catch { return NotFound(); }
            return Json(song.Entity);
        }

        [HttpPut("{id}")]
        public IActionResult Edit([FromServices]ApplicationDbContext context, int id, string name)
        {

            var song = context.SongCollection.Update(new SongCollection { Id = id, Name = name });
            try
            {
                context.SaveChanges();
            }
            catch (Exception ex) { return BadRequest(ex); }
            return Ok(song.Entity);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(
            [FromServices]ApplicationDbContext context,
            int id)
        {
            var item = context.SongCollection.SingleOrDefault(t => t.Id == id);
            if (item == null) return Json(new { succuess = false });
            context.SongCollection.Remove(item);
            context.SaveChanges();
            return new NoContentResult();
        }
    }
}
