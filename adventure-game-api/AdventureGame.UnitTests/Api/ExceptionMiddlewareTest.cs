using AdventuresService.API.Utilities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Hosting;
using System;
using System.Net;
using System.Threading.Tasks;
using Xunit;

namespace AdventureGame.UnitTests.Api
{
    public class ExceptionMiddlewareTest
    {
        [Fact]
        public async Task Middleware_ReturnStatusCode500()
        {
            using var host = await new HostBuilder()
                .ConfigureWebHost(webBuilder =>
                {
                    webBuilder
                        .UseTestServer()
                        .ConfigureServices(services =>
                        {
                            //services
                        })
                        .Configure(app =>
                        {
                            app.UseMiddleware<ExceptionMiddleware>();
                            app.Use(async (context,next) => {
                                throw new Exception("Data has issue");
                            });
                        });
                })
                .StartAsync();

            var response = await host.GetTestServer().CreateClient().GetAsync("/");
            Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
        }

        [Fact]
        public async Task Middleware_ShouldNotReturnErrorWhenNoEror()
        {
            using var host = await new HostBuilder()
                .ConfigureWebHost(webBuilder =>
                {
                    webBuilder
                        .UseTestServer()
                        .ConfigureServices(services =>
                        {
                            //services
                        })
                        .Configure(app =>
                        {
                            app.UseMiddleware<ExceptionMiddleware>();
                            app.Use((param1, param2) => {
                                return Task.FromResult(new OkResult());
                            });
                        });
                })
                .StartAsync();

            var response = await host.GetTestServer().CreateClient().GetAsync("/");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
    }
}
