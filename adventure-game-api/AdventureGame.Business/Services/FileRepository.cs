using System.Diagnostics.CodeAnalysis;
using System.IO;

namespace AdventureGame.Business.Services
{
    [ExcludeFromCodeCoverage]
    public class FileRepository : IFileRepository
    {
        public bool IsFileExist(string path) => File.Exists(path);

        public string ReadFile(string path) => File.ReadAllText(path);
        
    }
}
