using AdventureGame.Business.Entities;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace AdventuresService.API.Models
{
    public class AdventureResponse
    {
        [JsonProperty("adventures")]
        public IEnumerable<AdventureModel> Adventures { get; set; }

    }

    public class AdventureModel
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        public static explicit operator AdventureModel(Adventure adventure)
        {
            return new AdventureModel()
            {
                Name = adventure.Name,
                Description = adventure.Description,
            };
        }
    }
}
