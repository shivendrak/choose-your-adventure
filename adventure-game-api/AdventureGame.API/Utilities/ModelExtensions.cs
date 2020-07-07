using AdventureGame.Business.Entities;
using AdventuresService.API.Models;
using System.Collections.Generic;
using System.Linq;

namespace AdventuresService.API.Utilities
{
    public static class ModelExtensions
    {
        /// <summary>
        /// Converts Adventure entity to Adventure Model using explicity cast operator
        /// </summary>
        /// <param name="adventure">Instance of Adventure entity</param>
        /// <returns></returns>
        public static AdventureModel ToAdventureModel(this Adventure adventure) => (AdventureModel)adventure;

        /// <summary>
        /// Converts IEnumerable of Adventure entity to Advenure Response object
        /// </summary>
        /// <param name="adventures">Instance of IEnumerable of Adventure entity</param>
        /// <returns></returns>
        public static AdventureResponse ConvertToResponse(this IEnumerable<Adventure> adventures) => 
            new AdventureResponse() { Adventures = adventures.Select(adventure => adventure.ToAdventureModel()) };

        /// <summary>
        /// Converts Question entity to Question Model using explicity cast operator
        /// </summary>
        /// <param name="question">Instance of Question entity</param>
        /// <returns></returns>
        public static QuestionModel ToQuestionModel(this Question question) => (QuestionModel)question;

        /// <summary>
        /// Converts IEnumerable of Question entity to Question Response object
        /// </summary>
        /// <param name="questions">Instance of IEnumerable of Question entity</param>
        /// <returns></returns>
        public static QuestionResponse ConvertToResponse(this IEnumerable<Question> questions) =>
            new QuestionResponse() { Questions = questions.Select(question => question.ToQuestionModel()) };
    }
}
