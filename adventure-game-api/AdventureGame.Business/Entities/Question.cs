using Newtonsoft.Json;
using System.Collections.Generic;

namespace AdventureGame.Business.Entities
{
    public class Question
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("options", NullValueHandling = NullValueHandling.Ignore)]
        public List<Option> Options { get; set; }
    }

    public class QuestionEntity
    {
        [JsonProperty("questions")]
        public IEnumerable<Question> Questions { get; set; }
    }
}
