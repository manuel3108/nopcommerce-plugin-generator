import{F as i}from"./File-9e84454c.js";import{e as r}from"./index-5f5ec556.js";import"./vendor-3e99503a.js";import"./preload-helper-ec9aa979.js";class g{generate(e){const s=["Areas","Admin","Views"],o="_ViewImports",n="cshtml";return r(s,o,n),new i(o,n,s,this.generateContent(e))}generateContent(e){return`@inherits Nop.Web.Framework.Mvc.Razor.NopRazorPage<TModel>
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Nop.Web.Framework

@using System.Text.Encodings.Web
@using Microsoft.AspNetCore.Mvc.ViewFeatures
@using Microsoft.AspNetCore.Routing
@using Microsoft.Extensions.Primitives
@using Nop.Core
@using Nop.Core.Domain.Common
@using Nop.Core.Events
@using Nop.Core.Infrastructure
@using Nop.Services.Common
@using static Nop.Services.Common.NopLinksDefaults
@using Nop.Web.Areas.Admin.Models.Affiliates
@using Nop.Web.Areas.Admin.Models.Blogs
@using Nop.Web.Areas.Admin.Models.Catalog
@using Nop.Web.Areas.Admin.Models.Cms
@using Nop.Web.Areas.Admin.Models.Common
@using Nop.Web.Areas.Admin.Models.Customers
@using Nop.Web.Areas.Admin.Models.Directory
@using Nop.Web.Areas.Admin.Models.Discounts
@using Nop.Web.Areas.Admin.Models.ExternalAuthentication
@using Nop.Web.Areas.Admin.Models.Forums
@using Nop.Web.Areas.Admin.Models.Home
@using Nop.Web.Areas.Admin.Models.Localization
@using Nop.Web.Areas.Admin.Models.Logging
@using Nop.Web.Areas.Admin.Models.Messages
@using Nop.Web.Areas.Admin.Models.MultiFactorAuthentication
@using Nop.Web.Areas.Admin.Models.News
@using Nop.Web.Areas.Admin.Models.Orders
@using Nop.Web.Areas.Admin.Models.Payments
@using Nop.Web.Areas.Admin.Models.Plugins
@using Nop.Web.Areas.Admin.Models.Plugins.Marketplace
@using Nop.Web.Areas.Admin.Models.Polls
@using Nop.Web.Areas.Admin.Models.Reports
@using Nop.Web.Areas.Admin.Models.Security
@using Nop.Web.Areas.Admin.Models.Settings
@using Nop.Web.Areas.Admin.Models.Shipping
@using Nop.Web.Areas.Admin.Models.ShoppingCart
@using Nop.Web.Areas.Admin.Models.Stores
@using Nop.Web.Areas.Admin.Models.Tasks
@using Nop.Web.Areas.Admin.Models.Tax
@using Nop.Web.Areas.Admin.Models.Templates
@using Nop.Web.Areas.Admin.Models.Topics
@using Nop.Web.Areas.Admin.Models.Vendors
@using Nop.Web.Extensions
@using Nop.Web.Framework
@using Nop.Web.Framework.Menu
@using Nop.Web.Framework.Models
@using Nop.Web.Framework.Events
@using Nop.Web.Framework.Extensions
@using Nop.Web.Framework.Infrastructure
@using Nop.Web.Framework.Models.DataTables
@using Nop.Web.Framework.Security.Captcha
@using Nop.Web.Framework.Security.Honeypot
@using Nop.Web.Framework.Themes
@using Nop.Web.Framework.UI`}}export{g as default};
