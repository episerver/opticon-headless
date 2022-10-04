using Advanced.CMS.AdvancedReviews;
using EPiServer.Cms.Shell;
using EPiServer.Cms.Shell.UI;
using EPiServer.Cms.Shell.UI.Configurations;
using EPiServer.Cms.UI.AspNetIdentity;
using EPiServer.ContentApi.Cms;
using EPiServer.ContentApi.Cms.Internal;
using EPiServer.ContentDefinitionsApi;
using EPiServer.ContentManagementApi;
using EPiServer.DependencyInjection;
using EPiServer.OpenIDConnect;
using EPiServer.Web;
using EPiServer.Web.Routing;
using Fluid.MvcViewEngine;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Optimizely.CMS.Labs.LiquidTemplating.ViewEngine;
using System;

namespace Optimizely.Server
{
    public class Startup
    {
        private readonly IWebHostEnvironment _webHostingEnvironment;
        private readonly IConfiguration _configuration;

        public Startup(IWebHostEnvironment webHostingEnvironment,
            IConfiguration configuration)
        {
            _webHostingEnvironment = webHostingEnvironment;
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            if (_webHostingEnvironment.IsDevelopment())
            {
                //Add development configuration
            }

            services.AddMvc()
                .AddFluid()
                .AddCmsFluid();

            services.Configure<FluidMvcViewOptions>(options =>
            {
                options.ViewsFileProvider  = new ContentFileProvider("/globalassets/templates");
                options.PartialsFileProvider = new ContentFileProvider("/globalassets/templates/shared");
            });
            services.AddCms()
            .AddCmsAspNetIdentity<ApplicationUser>();

            services.AddFind();
            services.AddAdvancedReviews();
            services.AddAdminUserRegistration(options => options.Behavior = RegisterAdminUserBehaviors.Enabled | RegisterAdminUserBehaviors.SingleUserOnly);

            services.ConfigureContentApiOptions(o =>
            {
                o.EnablePreviewFeatures = true;
                o.IncludeEmptyContentProperties = true;
                o.FlattenPropertyModel = true;
                o.IncludeMasterLanguage = false;
            });

            services.AddContentDeliveryApi(OpenIDConnectOptionsDefaults.AuthenticationScheme, options => options.SiteDefinitionApiEnabled = true)
               .WithFriendlyUrl()
               .WithSiteBasedCors();

            services.AddContentSearchApi(o => o.MaximumSearchResults = 100);
            services.AddContentDefinitionsApi(OpenIDConnectOptionsDefaults.AuthenticationScheme, o => o.DisableScopeValidation = true);
            services.AddContentManagementApi(OpenIDConnectOptionsDefaults.AuthenticationScheme, o => o.DisableScopeValidation = true);

            services.AddOpenIDConnect<ApplicationUser>(true, null, null, true, options =>
            {
                options.RequireHttps = !_webHostingEnvironment.IsDevelopment();
                var application = new OpenIDConnectApplication()
                {
                    ClientId = "postman-client",
                    ClientSecret = "postman",
                    Scopes =
                    {
                        ContentDeliveryApiOptionsDefaults.Scope,
                        ContentManagementApiOptionsDefaults.Scope,
                        ContentDefinitionsApiOptionsDefaults.Scope,
                    }
                };

                // Using Postman for testing purpose.
                // The authorization code is sent to postman after successful authentication.
                application.RedirectUris.Add(new Uri("https://oauth.pstmn.io/v1/callback"));
                options.Applications.Add(application);
                options.AllowResourceOwnerPasswordFlow = true;
            }, null);

            services.AddOpenIDConnectUI();
            services.ConfigureContentDeliveryApiSerializer(settings => settings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore);
            services.ConfigureApplicationCookie(options => options.LoginPath = "/util/Login");
            services.Configure<HeadlessModeOptions>(o => o.HeadlessModeEnabled = false);
            services.AddContentGraph(_configuration);
            services.Configure<UploadOptions>(x => x.FileSizeLimit = 20971520L);
            services.Configure<DisplayOptions>(options =>
            {
                options.Add("full", "/displayoptions/full", "basis-full", "", "epi-icon__layout--full");
                options.Add("onesixth", "/displayoptions/onesixth", "basis-1/6", "", "epi-icon__layout--one-sixth");
                options.Add("onefourth", "/displayoptions/onefourth", "basis-1/4", "", "epi-icon__layout--one-fourth");
                options.Add("onethird", "/displayoptions/onethird", "basis-1/3", "", "epi-icon__layout--one-third");
                options.Add("half", "/displayoptions/half", "basis-1/2", "", "epi-icon__layout--half");
                options.Add("twothird", "/displayoptions/twothird", "basis-2/3", "", "epi-icon__layout--half");
                options.Add("threefourth", "/displayoptions/threefourth", "basis-3/4", "", "epi-icon__layout--fice-sixths");
                options.Add("fivesixth", "/displayoptions/fivesixth", "basis-5/6", "", "epi-icon__layout--full");
            });

        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseRouting();

            app.UseCors(b => b
                .WithOrigins(new[] { "http://localhost:8080", "https://oauth.pstmn.io" })
                .WithExposedContentDeliveryApiHeaders()
                .WithExposedContentDefinitionApiHeaders()
                .WithHeaders("Authorization")
                .AllowAnyMethod()
                .AllowCredentials());

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapContent();
            });
        }
    }
}
