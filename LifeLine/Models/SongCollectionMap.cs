using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LifeLine.Models
{
    public class SongCollectionMap
    {
        [ForeignKey("Song")]
        public int SongId { get; set; }
        [ForeignKey("SongCollection")]
        public int SongCollectionId { get; set; }

        public Song Song { get; set; }
        public SongCollection SongCollection { get; set; }
    }
}
