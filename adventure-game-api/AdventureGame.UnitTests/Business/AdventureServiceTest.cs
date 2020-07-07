using AdventureGame.Business.Entities;
using AdventureGame.Business.Services;
using Castle.Core.Logging;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace AdventureGame.UnitTests.Business
{
    public class AdventureServiceTest
    {
        private readonly Mock<IFileRepository> fileRepository;
        private readonly Mock<ILogger<AdventureService>> logger;

        public AdventureServiceTest()
        {
            fileRepository = new Mock<IFileRepository>();
            logger = new Mock<ILogger<AdventureService>>();
        }

        [Theory]
        [InlineData("{\"adventures\": [{ \"name\": \"test-advenure\",\"description\": \"Test Adventure\"}]}", 1)]
        [InlineData("{\"adventures\": []}", 0)]
        public async Task GetAdventures_ShouldReturnAllAdventures(string json, int count)
        {
            fileRepository.Setup(_ => _.IsFileExist(It.IsAny<string>())).Returns(true);
            fileRepository.Setup(_ => _.ReadFile(It.IsAny<string>())).Returns(json);
            var adventureService = new AdventureService(fileRepository.Object, logger.Object);
            var adventures = await adventureService.GetAdventuresAsync();

            Assert.NotNull(adventures);
            Assert.Equal(adventures.Count(), count);
        }

        [Fact]
        public async Task GetAdventures_ShouldThrowException_WhenInvalidPath()
        {
            fileRepository.Setup(_ => _.IsFileExist(It.IsAny<string>())).Returns(false);
            var adventureService = new AdventureService(fileRepository.Object, logger.Object);
            await Assert.ThrowsAsync<FileNotFoundException>(() => adventureService.GetAdventuresAsync());
        }

        [Theory]
        [InlineData("{}")]
        [InlineData("")]
        [InlineData("{\"changed-property\": [{ \"name\": \"test-advenure\",\"description\": \"Test Adventure\"}]}")]
        [InlineData("{\"adventures\": [\"test\"]}")]
        public async Task GetAdventures_ShouldThrowException_WhenInvalidData(string json)
        {
            fileRepository.Setup(_ => _.IsFileExist(It.IsAny<string>())).Returns(true);
            fileRepository.Setup(_ => _.ReadFile(It.IsAny<string>())).Returns(json);
            var adventureService = new AdventureService(fileRepository.Object, logger.Object);
            await Assert.ThrowsAsync<InvalidDataException>(() => adventureService.GetAdventuresAsync());
        }
    }
}
