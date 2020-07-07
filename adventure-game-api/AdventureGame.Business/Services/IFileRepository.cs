using System;
using System.Collections.Generic;
using System.Text;

namespace AdventureGame.Business.Services
{
    public interface IFileRepository
    {
        bool IsFileExist(string path);

        string ReadFile(string path);
    }
}
