using AdventureGame.Business.Entities;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace AdventureGame.Business.Services
{
    public class AdventureService : IAdventureService
    {
        private readonly IFileRepository fileRepository;
        private readonly ILogger logger;
        public AdventureService(IFileRepository fileRepository, ILogger<AdventureService> logger)
        {
            this.fileRepository = fileRepository;
            this.logger = logger;
        }
        public async Task<IEnumerable<Adventure>> GetAdventuresAsync()
        {
            var path = "data/adventures.json";
            logger.LogInformation($"Reading file: {path}");
            if (!fileRepository.IsFileExist(path))
            {
                var exception = new FileNotFoundException("invalid file path");
                logger.LogError(exception, $"file not found at {path}");
                throw exception;
            }
            var allText = fileRepository.ReadFile(path);
            logger.LogInformation($"Read file complete: {path}");
            try
            {
                logger.LogInformation($"Transforming file data");
                var adventure = JsonConvert.DeserializeObject<AdventureEntity>(allText, new JsonSerializerSettings() { });
                if (adventure == null || adventure.Adventures== null) throw new InvalidDataException("File content is not in correct format");
                logger.LogInformation($"Success : Transformation of file data");
                return await Task.FromResult(adventure.Adventures);
            } catch(Exception ex)
            {
                logger.LogError(ex, $"failed to transform data from file :${path}");
                throw new InvalidDataException("provided file is not in correct format"); ;
            }
        }

        public async Task<IEnumerable<Question>> GetQuestionsAsync(string name)
        {
            var path = $"data/{name}.json";
            logger.LogInformation($"Reading file: {path}");
            if (!fileRepository.IsFileExist(path))
            {
                var exception = new FileNotFoundException("invalid file path");
                logger.LogError(exception, $"file not found at {path}");
                throw exception;
            }
            var allText = fileRepository.ReadFile(path);
            logger.LogInformation($"Read file complete: {path}");
            try
            {
                logger.LogInformation($"Transforming file data");
                var questions = JsonConvert.DeserializeObject<QuestionEntity>(allText);
                if (questions == null || questions.Questions == null) throw new InvalidDataException("File content is not in correct format");
                logger.LogInformation($"Success : Transformation of file data");
                return await Task.FromResult(questions.Questions);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"failed to transform data from file :${path}");
                throw new InvalidDataException("provided file is not in correct format"); ;
            }
        }
    }
}
