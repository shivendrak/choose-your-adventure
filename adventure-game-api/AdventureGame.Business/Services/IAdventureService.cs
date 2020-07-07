using AdventureGame.Business.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AdventureGame.Business.Services
{
    public interface IAdventureService
    {
        Task<IEnumerable<Adventure>> GetAdventuresAsync();
        Task<IEnumerable<Question>> GetQuestionsAsync(string name);
    }
}
