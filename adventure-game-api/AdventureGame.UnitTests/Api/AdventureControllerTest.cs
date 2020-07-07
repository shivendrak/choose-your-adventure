using AdventureGame.Business.Entities;
using AdventureGame.Business.Services;
using AdventuresService.API.Controllers;
using AdventuresService.API.Models;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace AdventureGame.UnitTests.Api
{
    public class AdventureControllerTest
    {
        [Fact]
        public async Task Get_ShouldReturn_AllAdventures()
        {
            // Arrange
            var adventureService = new Mock<IAdventureService>();
            adventureService.Setup(svc => svc.GetAdventuresAsync())
                .ReturnsAsync(new List<Adventure>() { new Adventure() });
            var controller = new AdventureController(adventureService.Object);

            // Act
            var result = await controller.Get();

            // Assert
            Assert.NotNull(result);
            var model = Assert.IsAssignableFrom<AdventureResponse>(result);
            Assert.Single(model.Adventures);
        }

        [Fact]
        public async Task GetWithName_ShouldReturn_AllQuestions()
        {
            // Arrange
            var adventureService = new Mock<IAdventureService>();
            adventureService.Setup(svc => svc.GetQuestionsAsync("test-adventure"))
                .ReturnsAsync(new List<Question>() { new Question() });
            var controller = new AdventureController(adventureService.Object);

            // Act
            var result = await controller.Get("test-adventure");

            // Assert
            Assert.NotNull(result);
            var model = Assert.IsAssignableFrom<QuestionResponse>(result);
            Assert.Single(model.Questions);
        }
    }
}
