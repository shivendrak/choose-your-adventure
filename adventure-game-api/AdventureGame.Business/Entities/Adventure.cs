using Newtonsoft.Json;
using System.Collections.Generic;

namespace AdventureGame.Business.Entities
{
    public class Adventure
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }
    }

    public class AdventureEntity
    {
        [JsonProperty("adventures")]
        public IEnumerable<Adventure> Adventures { get; set; }
    }
}
