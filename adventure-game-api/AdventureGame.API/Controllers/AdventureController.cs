using AdventureGame.API.Utilities;
using AdventureGame.Business.Services;
using AdventuresService.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace AdventuresService.API.Controllers
{
    [Route("adventures")]
    [ApiController]
    public class AdventureController : ControllerBase
    {
        private readonly IAdventureService _adventureService;
        public AdventureController(IAdventureService adventureService)
        {
            _adventureService = adventureService;
        }

        /// <summary>
        /// Method returns all the Adventure Info list. 
        /// </summary>
        /// <returns></returns>
        [HttpGet()]
        public async Task<AdventureResponse> Get() => (await _adventureService.GetAdventuresAsync()).ConvertToResponse();

        /// <summary>
        /// Method return story of adventure. Ideally the path should have been {name}/questions,but keeping it like this for simplicity.
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpGet("{name}")]
        public async Task<QuestionResponse> Get([Required]string name) => (await _adventureService.GetQuestionsAsync(name)).ConvertToResponse();
    }
}