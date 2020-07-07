using AdventureGame.Business.Entities;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace AdventuresService.API.Models
{
    public class QuestionResponse
    {
        [JsonProperty("adventures")]
        public IEnumerable<QuestionModel> Questions { get; set; }
    }

    public class QuestionModel
    {
        public QuestionModel()
        {
          Options = new List<Option>();
        }

        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("options")]
        public List<Option> Options { get; set; }

        public static explicit operator QuestionModel(Question question)
        {
            return new QuestionModel()
            {
               Id = question.Id, Options = question.Options, Description = question.Description
            };
        }
    } 
}
