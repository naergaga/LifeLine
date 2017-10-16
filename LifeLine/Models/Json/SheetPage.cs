using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LifeLine.Models.Json
{
    public class SheetPage
    {
        public int Id { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPage { get; set; }
        public int PageSize { get; set; }
        public List<Song> Songs { get; set; }
    }
}
