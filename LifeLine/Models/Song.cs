using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LifeLine.Models
{
    public class Song
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Performers { get; set; }
        public string Composers { get; set; }
        [Required]
        public string UploadFileName { get; set; }
        [Required]
        public string Path { get; set; }
    }
}
