using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using LifeLine.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LifeLine.Controllers
{
    [Route("api/[controller]")]
    public class ImageController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost("up")]
        [Authorize]
        public IActionResult Post(List<IFormFile> upfiles,
            [FromServices]ImageService service)
        {
            List<string> imageUrls = new List<string>();
            foreach (var file in upfiles)
            {
                imageUrls.Add(service.SaveImage(file, User).Path);
            }
            return Json(imageUrls);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
