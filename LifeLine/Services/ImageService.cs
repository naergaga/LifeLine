using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using LifeLine.Data;
using Microsoft.AspNetCore.Identity;
using LifeLine.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace LifeLine.Services
{
    public class ImageService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHostingEnvironment _env;
        private readonly static string _upImgPath = "/images/ups"; 

        public ImageService(ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            IHostingEnvironment env)
        {
            _context = context;
            _userManager = userManager;
            _env = env;
        }

        public UpImage SaveImage(IFormFile file, ClaimsPrincipal user)
        {
            var userId = _userManager.GetUserId(user);
            var rePath = _upImgPath + "/" + Guid.NewGuid().ToString("N")+Path.GetExtension(file.FileName);
            var fileSavePath = GetSavePath(rePath);
            var stream = new FileStream(fileSavePath, FileMode.CreateNew);
            file.CopyTo(stream);
            stream.Close();

            UpImage upImage = new UpImage
            {
                Path = rePath,
                UploadTime = DateTime.Now,
                UserId = userId
            };
            _context.UpImage.Add(upImage);
            _context.SaveChanges();
            return upImage;
        }

        private string GetSavePath(string rePath)
        {
            return _env.WebRootPath + rePath.Replace('/', '\\');
        }
    }
}
