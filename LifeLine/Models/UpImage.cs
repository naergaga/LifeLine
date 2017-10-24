using LifeLine.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LifeLine.Models
{
    public class UpImage
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public DateTime UploadTime { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        //TODO:add a prop UpName or Title?

        public virtual ApplicationUser User { get; set; }
    }

}
