
using Newtonsoft.Json;

namespace AdventureGame.Business.Entities
{
    public class Option
    {
        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("nextStep")]
        public int nextStep { get; set; }
    }
}
