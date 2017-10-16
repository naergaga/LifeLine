using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using LifeLine.Models;
using LifeLine.Data;

namespace LifeLine.Pages.Music
{
    public class IndexModel : PageModel
    {
        private readonly ApplicationDbContext _context;

        public IEnumerable<SongCollection> Collections { get; set; }
        public IEnumerable<Song> Songs { get; set; }

        public IndexModel(ApplicationDbContext context)
        {
            _context = context;
        }

        public void OnGet()
        {
            this.Songs = _context.Song.Skip(0).Take(10);
            this.Collections = _context.SongCollection.Skip(0).Take(10);
        }
    }
}