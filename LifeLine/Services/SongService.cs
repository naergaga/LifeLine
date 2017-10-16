using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Http;
using LifeLine.Data;
using LifeLine.Models;

namespace LifeLine.Services
{
    public class SongService
    {

        private readonly IHostingEnvironment _env;
        private readonly ApplicationDbContext _context;

        public SongService(IHostingEnvironment env, ApplicationDbContext context)
        {
            _env = env;
            _context = context;
        }

        private Song GetByFile(string path)
        {
            var file = TagLib.File.Create(path);
            var tag = file.Tag;
            Song song = new Song();
            song.Title = tag.Title;
            song.Performers = tag.JoinedPerformers;
            song.Composers = tag.JoinedComposers;
            return song;
        }

        public async Task<Song> SaveSongAsync(IFormFile formFile)
        {
            if (formFile.Length > 0)
            {
                //歌曲名准备
                var fileName = Guid.NewGuid().ToString("N") + Path.GetExtension(formFile.FileName);
                var rePath = $"/songs/{fileName}";
                var abPath = GetSongPath(rePath);

                //写入文件
                using (var stream = new FileStream(abPath, FileMode.CreateNew))
                {
                    await formFile.CopyToAsync(stream);
                }

                //获取tag信息
                var song = GetByFile(abPath);
                song.Path = rePath;
                song.UploadFileName = formFile.FileName;
                return song;
            }
            return null;
        }

        //public SongList GetSongsModel(int page, int pageSize)
        //{
        //    var songs = _context.Songs.Skip((page - 1) * pageSize).Take(pageSize);
        //    var count = (int)Math.Ceiling(_context.Songs.Count() / (double)pageSize);
        //    return new SongList
        //    {
        //        Songs = songs,
        //        CurrentPage = page,
        //        PageCount = count
        //    };
        //}

        public string GetSongPath(string source)
        {
            return _env.WebRootPath + source.Replace('/', '\\');
        }
    }
}
