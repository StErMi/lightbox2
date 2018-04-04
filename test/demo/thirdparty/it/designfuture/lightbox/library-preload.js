jQuery.sap.registerPreloadedModules({
	"version": "2.0",
	"name": "it/designfuture/lightbox/library-preload",
	"modules": {
		"it/designfuture/lightbox/library.js": "/*!\r\n * ${copyright}\r\n */\r\n\r\n/**\r\n * Initialization Code and shared classes of library it.designfuture.lightbox.\r\n */\r\nsap.ui.define([\r\n\t'jquery.sap.global', \r\n\t'sap/ui/core/library' // library dependency\r\n\t],  function(jQuery, library) {\r\n\r\n\t\t\"use strict\";\r\n\r\n\t\t/**\r\n\t\t * Suite controls library.\r\n\t\t *\r\n\t\t * @namespace\r\n\t\t * @name it.designfuture.lightbox\r\n\t\t * @author Emanuele Ricci <stermi@gmail.com>\r\n\t\t * @version ${version}\r\n\t\t * @public\r\n\t\t */\r\n\r\n\r\n\t\t// delegate further initialization of this library to the Core\r\n\t\tsap.ui.getCore().initLibrary({\r\n\t\t\tname : \"it.designfuture.lightbox\",\r\n\t\t\tversion: \"${version}\",\r\n\t\t\tdependencies : [\"sap.ui.core\", \"sap.m\"],\r\n\t\t\ttypes: [],\r\n\t\t\tinterfaces: [],\r\n\t\t\tcontrols: [ \r\n\t\t\t\t\"it.designfuture.lightbox.Lightbox\",\r\n\t\t\t\t\"it.designfuture.lightbox.LightboxImage\"\r\n\t\t\t],\r\n\t\t\telements: []\r\n\t\t});\r\n\r\n\t\treturn it.designfuture.lightbox;\r\n\r\n}, /* bExport= */ false);",
		"it/designfuture/lightbox/Lightbox.js": "/*!\r\n * ${copyright}\r\n */\r\n\r\n// Provides control it.designfuture.lightbox.Lightbox\r\nsap.ui.define([\r\n    'jquery.sap.global',\r\n    'sap/ui/core/Control',\r\n    'sap/ui/layout/Grid',\r\n    './3rdparty/lightbox.min',\r\n    './library'\r\n], function(jQuery, Control, Grid, lightboxLib, library) {\r\n\"use strict\";\r\n\r\n/**\r\n * Constructor for a new Lightbox.\r\n *\r\n * @param {string} [sId] id for the new control, generated automatically if no id is given \r\n * @param {object} [mSettings] initial settings for the new control\r\n *\r\n * @class\r\n * Lightbox TODO ADD HERE A DESCRIPTION\r\n * @extends sap.m.InputBase\r\n * @version ${version}\r\n *\r\n * @constructor\r\n * @public\r\n * @since 1.40\r\n * @name it.designfuture.lightbox.Lightbox\r\n */\r\n\r\nvar Lightbox = Control.extend(\"it.designfuture.lightbox.Lightbox\", /** @lends it.designfuture.lightbox.Lightbox prototype */ { \r\n    \r\n    metadata : {\r\n        library: 'it.designfuture.lightbox',\r\n        properties : {\r\n            \r\n            /**\r\n             * \tGallery ID if you want to group images inside a gallery\r\n             */\r\n            gallery : {type : \"string\", group : \"Appearance\", defaultValue : null},\r\n            \r\n            /**\r\n             * \tIf true, the left and right navigation arrows which appear on mouse hover when viewing image \r\n             *  sets will always be visible on devices which support touch.\r\n             */\r\n            alwaysShowNavOnTouchDevices : {type : \"boolean\", group : \"Appearance\", defaultValue : false},\r\n            \r\n            /**\r\n             * \tThe text displayed below the caption when viewing an image set. \r\n             *  The default text shows the current image number and the total number of images in the set.\r\n             */\r\n            albumLabel : {type : \"string\", group : \"Appearance\", defaultValue : \"Image %1 of %2\"},\r\n            \r\n            /**\r\n             * \tIf true, prevent the page from scrolling while Lightbox is open. \r\n             *  This works by settings overflow hidden on the body.\r\n             */\r\n            disableScrolling : {type : \"boolean\", group : \"Appearance\", defaultValue : false},\r\n            \r\n            /**\r\n             * \tThe time it takes for the Lightbox container and overlay to fade in and out, in milliseconds.\r\n             */\r\n            fadeDuration : {type : \"int\", group : \"Appearance\", defaultValue : 600},\r\n            \r\n            /**\r\n             * \tIf true, resize images that would extend outside of the viewport so they fit neatly inside of it. \r\n             *  This saves the user from having to scroll to see the entire image.\r\n             */\r\n            fitImagesInViewport : {type : \"boolean\", group : \"Appearance\", defaultValue : true},\r\n            \r\n            /**\r\n             * \tThe time it takes for the image to fade in once loaded, in milliseconds.\r\n             */\r\n            imageFadeDuration : {type : \"int\", group : \"Appearance\", defaultValue : 600},\r\n            \r\n            /**\r\n             * \tIf set, the image width will be limited to this number, in pixels. Aspect ratio will not be maintained.\r\n             */\r\n            maxWidth : {type : \"int\", group : \"Appearance\", defaultValue : null},\r\n            \r\n            /**\r\n             * \tIf set, the image height will be limited to this number, in pixels. Aspect ratio will not be maintained.\r\n             */\r\n            maxHeight : {type : \"int\", group : \"Appearance\", defaultValue : null},\r\n            \r\n            /**\r\n             * \tThe distance from top of viewport that the Lightbox container will appear, in pixels.\r\n             */\r\n            positionFromTop : {type : \"int\", group : \"Appearance\", defaultValue : 50},\r\n            \r\n            /**\r\n             * \tThe time it takes for the Lightbox container to animate its width and height when transition between different size images, in milliseconds.\r\n             */\r\n            resizeDuration : {type : \"int\", group : \"Appearance\", defaultValue : 700},\r\n            \r\n            /**\r\n             * \tIf false, the text indicating the current image number and the total number of images in set (Ex. \"image 2 of 4\") will be hidden.\r\n             */\r\n            showImageNumberLabel : {type : \"boolean\", group : \"Appearance\", defaultValue : true},\r\n            \r\n            /**\r\n             * \tIf true, when a user reaches the last image in a set, the right navigation arrow will appear and they \r\n             *  will be to continue moving forward which will take them back to the first image in the set.\r\n             */\r\n            wrapAround : {type : \"boolean\", group : \"Appearance\", defaultValue : false},\r\n            \r\n        },\r\n\t\tdefaultAggregation : \"content\",\r\n\t\taggregations : {\r\n\r\n\t\t\t/**\r\n\t\t\t * Controls that are placed into layout.\r\n\t\t\t */\r\n\t\t\tcontent : {type : \"it.designfuture.lightbox.LightboxImage\", multiple : true, singularName : \"content\"},\r\n            _grid : {type : \"sap.ui.layout.Grid\", multiple : false, visibility: \"hidden\"}\r\n\t\t},\r\n        events: {\r\n            \r\n        }\r\n    }, \r\n    \r\n    init: function() {\r\n        //\tInit all the things!\r\n        this.setAggregation(\"_grid\", new Grid());\r\n        \r\n        if ( !this.getGallery() ) {\r\n            this.setGallery( this.getId() );\r\n        }\r\n    },\r\n    \r\n    onAfterRendering: function() {\r\n        var config = {\r\n            alwaysShowNavOnTouchDevices: this.getAlwaysShowNavOnTouchDevices(),\r\n            albumLabel: this.getAlbumLabel(),\r\n            disableScrolling: this.getDisableScrolling(),\r\n            fadeDuration: this.getFadeDuration(),\r\n            fitImagesInViewport: this.getFitImagesInViewport(),\r\n            imageFadeDuration: this.getImageFadeDuration(),\r\n            positionFromTop: this.getPositionFromTop(),\r\n            resizeDuration: this.getResizeDuration(),\r\n            showImageNumberLabel: this.getShowImageNumberLabel(),\r\n            wrapAround: this.getWrapAround()\r\n        };\r\n\r\n        if ( this.getMaxWidth() ) {\r\n            config.maxWidth = this.getMaxWidth();\r\n        }\r\n\r\n        if ( this.getMaxHeight() ) {\r\n            config.maxHeight = this.getMaxHeight();\r\n        }\r\n\r\n        lightbox.option(config);\r\n    },\r\n    \r\n    ////////////////////////////////////////////////////\r\n    //\tINTERNAL METHODS\r\n    ////////////////////////////////////////////////////\r\n    \r\n    \r\n    ////////////////////////////////////////////////////\r\n    //\tGETTER & SETTER FOR PROPERTIES\r\n    ////////////////////////////////////////////////////\r\n\r\n    \r\n});\r\n\r\n/*\r\n* Override the exit method to free local resources and destroy \r\n* Optionally, pass true as the second argument to force any onChange events to fire\r\n* @public\r\n*/\t\r\nLightbox.prototype.exit = function() {\r\n    Control.prototype.exit.apply(this, arguments);\r\n};\r\n\r\nreturn Lightbox;\r\n\r\n}, /* bExport= */ true);",
		"it/designfuture/lightbox/LightboxImage.js": "/*!\r\n * ${copyright}\r\n */\r\n\r\n// Provides control it.designfuture.lightbox.Lightbox\r\nsap.ui.define([\r\n    'jquery.sap.global',\r\n    'sap/m/Image',\r\n    './library'\r\n], function(jQuery, Image, library) {\r\n\"use strict\";\r\n\r\n/**\r\n * Constructor for a new Lightbox.\r\n *\r\n * @param {string} [sId] id for the new control, generated automatically if no id is given \r\n * @param {object} [mSettings] initial settings for the new control\r\n *\r\n * @class\r\n * Lightbox TODO ADD HERE A DESCRIPTION\r\n * @extends sap.m.InputBase\r\n * @version ${version}\r\n *\r\n * @constructor\r\n * @public\r\n * @since 1.40\r\n * @name it.designfuture.lightbox.LightboxImage\r\n */\r\n\r\nvar LightboxImage = Image.extend(\"it.designfuture.lightbox.LightboxImage\", /** @lends it.designfuture.lightbox.LightboxImage prototype */ { \r\n    \r\n    metadata : {\r\n        library: 'it.designfuture.lightbox',\r\n        properties : {\r\n            \r\n            /**\r\n             * \tSrc of the Image\r\n             */\r\n            src : {type : \"string\", group : \"Appearance\", defaultValue : null},\r\n            \r\n            /**\r\n             * \tThumb of the Image\r\n             */\r\n            thumb : {type : \"string\", group : \"Appearance\", defaultValue : null},\r\n            \r\n            /**\r\n             * \tHeight of the Image\r\n             */\r\n            height : {type : \"string\", group : \"Appearance\", defaultValue : \"200px\"},\r\n            \r\n            /**\r\n             * \tTitle of the Image\r\n             */\r\n            title : {type : \"string\", group : \"Appearance\", defaultValue : \"\"},\r\n            \r\n            /**\r\n             * \tAlt attribute of the Image\r\n             */\r\n            alt : {type : \"string\", group : \"Appearance\", defaultValue : \"\"},\r\n\r\n        },\r\n        aggregations: {\r\n            /**\r\n             * \tImage aggregation for using the sap.m.Image control in this control (act as a Composite control)\r\n             */\r\n            _image : {type : \"sap.m.Image\", multiple : false, visibility: \"hidden\"}\r\n         },\r\n        events: {}\r\n    },\r\n    \r\n    ////////////////////////////////////////////////////\r\n    //\tINTERNAL METHODS\r\n    ////////////////////////////////////////////////////\r\n    init:function(){\r\n    \tthis.setAggregation(\"_image\", new Image({\r\n            width: \"100%\",\r\n            height: this.getHeight(),\r\n            alt: this.getAlt(),\r\n            src: this.getThumb() ? this.getThumb() : this.getSrc()\r\n        }));\r\n    },\r\n    \r\n    ////////////////////////////////////////////////////\r\n    //\tGETTER & SETTER FOR PROPERTIES\r\n    ////////////////////////////////////////////////////\r\n\r\n    ////////////////////////////////////////////////////\r\n    setSrc:function(sSrc){\r\n        this.setProperty(\"src\", sSrc, true /*no re-rendering of whole lightbox image needed*/);\r\n        this.getAggregation(\"_image\").setSrc(sSrc); // Note: this triggers re-rendering of Image!\r\n    },\r\n    setHeight:function(sHeight){\r\n        this.setProperty(\"height\", sHeight, true /*no re-rendering of whole lightbox image needed*/);\r\n        this.getAggregation(\"_image\").setHeight(sHeight); // Note: this triggers re-rendering of Image!\r\n    }\r\n    \r\n});\r\n\r\nreturn LightboxImage;\r\n\r\n}, /* bExport= */ true);",
		"it/designfuture/lightbox/LightboxImageRenderer.js": "/*!\r\n * UI development toolkit for HTML5 (OpenUI5)\r\n * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.\r\n * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.\r\n */\r\n\r\nsap.ui.define(['jquery.sap.global', 'sap/ui/core/Renderer', 'sap/m/ImageRenderer'],\r\n\tfunction(jQuery, Renderer, ImageRenderer) {\r\n\t\"use strict\";\r\n\r\n\r\n\t/**\r\n\t * LightboxImage renderer.\r\n\t * @namespace\r\n\t *\r\n\t * LightboxImageRenderer extends the ImageRenderer\r\n\t */\r\n\tvar LightboxImageRenderer = Renderer.extend(ImageRenderer);\r\n\r\n\t/**\r\n\t * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.\r\n\t *\r\n\t * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer\r\n\t * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered\r\n\t */\r\n\tLightboxImageRenderer.render = function(oRm, oControl) {\r\n\t\toRm.write(\"<a\");\r\n\t\toRm.writeControlData(oControl);\r\n\t\toRm.writeAttributeEscaped(\"href\", oControl.getSrc());\r\n\t\toRm.writeAttribute(\"data-title\", oControl.getTitle());\r\n\t\toRm.writeAttribute(\"data-lightbox\", oControl.getParent().getParent().getGallery());\r\n\t\toRm.write(\">\");\r\n\t\toRm.renderControl(oControl.getAggregation(\"_image\"));\r\n\t\toRm.write(\"</a>\");\r\n\t};\r\n \r\n\treturn LightboxImageRenderer;\r\n\r\n}, /* bExport= */ true);\r\n",
		"it/designfuture/lightbox/LightboxRenderer.js": "/*!\r\n * ${copyright}\r\n */\r\nsap.ui.define(['jquery.sap.global'],\r\n\tfunction(jQuery) {\r\n\t\"use strict\";\r\n\r\n\r\n\t/**\r\n\t * @author Emanuele Ricci\r\n\t * @version\r\n\t * 0.0.1\r\n\t * @namespace\r\n\t */\r\n\tvar LightboxRenderer = {};\r\n\r\n\t/**\r\n\t * Renders the HTML for the given control, using the provided\r\n\t * {@link sap.ui.core.RenderManager}.\r\n\t *\r\n\t * @param {sap.ui.core.RenderManager}\r\n\t *            oRm the RenderManager that can be used for writing to the render\r\n\t *            output buffer\r\n\t * @param {sap.ui.core.Control}\r\n\t *            oControl an object representation of the control that should be\r\n\t *            rendered\r\n\t */\r\n\tLightboxRenderer.render = function(oRm, oControl) {\r\n\t\t// write the HTML into the render manager\r\n\t\toRm.write(\"<div\");\r\n\t\toRm.writeControlData(oControl);\r\n\t\toRm.addClass(\"openui5-lightbox\");\r\n\t\toRm.writeClasses();\r\n\t\toRm.write(\">\");\r\n\r\n\t\tvar aItems = oControl.getContent();\t\t\r\n\t\tfor ( var i = 0; i < aItems.length; i++) { // loop over all child controls\r\n\t\t\t/*oRm.write(\"<div \");\r\n\t\t    oRm.addClass(\"openui5-lightbox-item\");\r\n\t\t\toRm.writeClasses();\r\n\t\t\toRm.write(\">\");*/\r\n\t\t\t//oRm.renderControl(aItems[i]);\r\n\t\t\toControl.getAggregation(\"_grid\").addContent(aItems[i]);\r\n\t\t\t//oRm.write(\"</div>\"); // end of the box around the respective child\r\n\t\t}\r\n\t\toRm.renderControl(oControl.getAggregation(\"_grid\"));\r\n\t\toRm.write(\"</div>\"); // end of the complete grid  control\r\n\t};\r\n\r\n\treturn LightboxRenderer;\r\n\r\n}, /* bExport= */ true);\r\n",
		"it/designfuture/lightbox/3rdparty/lightbox.min.js": "/*!\n * Lightbox v2.10.0\n * by Lokesh Dhakar\n *\n * More info:\n * http://lokeshdhakar.com/projects/lightbox2/\n *\n * Copyright 2007, 2018 Lokesh Dhakar\n * Released under the MIT license\n * https://github.com/lokesh/lightbox2/blob/master/LICENSE\n *\n * @preserve\n */\n!function(a,b){\"function\"==typeof define&&define.amd?define([\"jquery\"],b):\"object\"==typeof exports?module.exports=b(require(\"jquery\")):a.lightbox=b(a.jQuery)}(this,function(a){function b(b){this.album=[],this.currentImageIndex=void 0,this.init(),this.options=a.extend({},this.constructor.defaults),this.option(b)}return b.defaults={albumLabel:\"Image %1 of %2\",alwaysShowNavOnTouchDevices:!1,fadeDuration:600,fitImagesInViewport:!0,imageFadeDuration:600,positionFromTop:50,resizeDuration:700,showImageNumberLabel:!0,wrapAround:!1,disableScrolling:!1,sanitizeTitle:!1},b.prototype.option=function(b){a.extend(this.options,b)},b.prototype.imageCountLabel=function(a,b){return this.options.albumLabel.replace(/%1/g,a).replace(/%2/g,b)},b.prototype.init=function(){var b=this;a(document).ready(function(){b.enable(),b.build()})},b.prototype.enable=function(){var b=this;a(\"body\").on(\"click\",\"a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]\",function(c){return b.start(a(c.currentTarget)),!1})},b.prototype.build=function(){if(!(a(\"#lightbox\").length>0)){var b=this;a('<div id=\"lightboxOverlay\" class=\"lightboxOverlay\"></div><div id=\"lightbox\" class=\"lightbox\"><div class=\"lb-outerContainer\"><div class=\"lb-container\"><img class=\"lb-image\" src=\"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==\" /><div class=\"lb-nav\"><a class=\"lb-prev\" href=\"\" ></a><a class=\"lb-next\" href=\"\" ></a></div><div class=\"lb-loader\"><a class=\"lb-cancel\"></a></div></div></div><div class=\"lb-dataContainer\"><div class=\"lb-data\"><div class=\"lb-details\"><span class=\"lb-caption\"></span><span class=\"lb-number\"></span></div><div class=\"lb-closeContainer\"><a class=\"lb-close\"></a></div></div></div></div>').appendTo(a(\"body\")),this.$lightbox=a(\"#lightbox\"),this.$overlay=a(\"#lightboxOverlay\"),this.$outerContainer=this.$lightbox.find(\".lb-outerContainer\"),this.$container=this.$lightbox.find(\".lb-container\"),this.$image=this.$lightbox.find(\".lb-image\"),this.$nav=this.$lightbox.find(\".lb-nav\"),this.containerPadding={top:parseInt(this.$container.css(\"padding-top\"),10),right:parseInt(this.$container.css(\"padding-right\"),10),bottom:parseInt(this.$container.css(\"padding-bottom\"),10),left:parseInt(this.$container.css(\"padding-left\"),10)},this.imageBorderWidth={top:parseInt(this.$image.css(\"border-top-width\"),10),right:parseInt(this.$image.css(\"border-right-width\"),10),bottom:parseInt(this.$image.css(\"border-bottom-width\"),10),left:parseInt(this.$image.css(\"border-left-width\"),10)},this.$overlay.hide().on(\"click\",function(){return b.end(),!1}),this.$lightbox.hide().on(\"click\",function(c){return\"lightbox\"===a(c.target).attr(\"id\")&&b.end(),!1}),this.$outerContainer.on(\"click\",function(c){return\"lightbox\"===a(c.target).attr(\"id\")&&b.end(),!1}),this.$lightbox.find(\".lb-prev\").on(\"click\",function(){return 0===b.currentImageIndex?b.changeImage(b.album.length-1):b.changeImage(b.currentImageIndex-1),!1}),this.$lightbox.find(\".lb-next\").on(\"click\",function(){return b.currentImageIndex===b.album.length-1?b.changeImage(0):b.changeImage(b.currentImageIndex+1),!1}),this.$nav.on(\"mousedown\",function(a){3===a.which&&(b.$nav.css(\"pointer-events\",\"none\"),b.$lightbox.one(\"contextmenu\",function(){setTimeout(function(){this.$nav.css(\"pointer-events\",\"auto\")}.bind(b),0)}))}),this.$lightbox.find(\".lb-loader, .lb-close\").on(\"click\",function(){return b.end(),!1})}},b.prototype.start=function(b){function c(a){d.album.push({alt:a.attr(\"data-alt\"),link:a.attr(\"href\"),title:a.attr(\"data-title\")||a.attr(\"title\")})}var d=this,e=a(window);e.on(\"resize\",a.proxy(this.sizeOverlay,this)),a(\"select, object, embed\").css({visibility:\"hidden\"}),this.sizeOverlay(),this.album=[];var f,g=0,h=b.attr(\"data-lightbox\");if(h){f=a(b.prop(\"tagName\")+'[data-lightbox=\"'+h+'\"]');for(var i=0;i<f.length;i=++i)c(a(f[i])),f[i]===b[0]&&(g=i)}else if(\"lightbox\"===b.attr(\"rel\"))c(b);else{f=a(b.prop(\"tagName\")+'[rel=\"'+b.attr(\"rel\")+'\"]');for(var j=0;j<f.length;j=++j)c(a(f[j])),f[j]===b[0]&&(g=j)}var k=e.scrollTop()+this.options.positionFromTop,l=e.scrollLeft();this.$lightbox.css({top:k+\"px\",left:l+\"px\"}).fadeIn(this.options.fadeDuration),this.options.disableScrolling&&a(\"html\").addClass(\"lb-disable-scrolling\"),this.changeImage(g)},b.prototype.changeImage=function(b){var c=this;this.disableKeyboardNav();var d=this.$lightbox.find(\".lb-image\");this.$overlay.fadeIn(this.options.fadeDuration),a(\".lb-loader\").fadeIn(\"slow\"),this.$lightbox.find(\".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption\").hide(),this.$outerContainer.addClass(\"animating\");var e=new Image;e.onload=function(){var f,g,h,i,j,k;d.attr({alt:c.album[b].alt,src:c.album[b].link}),a(e),d.width(e.width),d.height(e.height),c.options.fitImagesInViewport&&(k=a(window).width(),j=a(window).height(),i=k-c.containerPadding.left-c.containerPadding.right-c.imageBorderWidth.left-c.imageBorderWidth.right-20,h=j-c.containerPadding.top-c.containerPadding.bottom-c.imageBorderWidth.top-c.imageBorderWidth.bottom-120,c.options.maxWidth&&c.options.maxWidth<i&&(i=c.options.maxWidth),c.options.maxHeight&&c.options.maxHeight<i&&(h=c.options.maxHeight),(e.width>i||e.height>h)&&(e.width/i>e.height/h?(g=i,f=parseInt(e.height/(e.width/g),10),d.width(g),d.height(f)):(f=h,g=parseInt(e.width/(e.height/f),10),d.width(g),d.height(f)))),c.sizeContainer(d.width(),d.height())},e.src=this.album[b].link,this.currentImageIndex=b},b.prototype.sizeOverlay=function(){this.$overlay.width(a(document).width()).height(a(document).height())},b.prototype.sizeContainer=function(a,b){function c(){d.$lightbox.find(\".lb-dataContainer\").width(g),d.$lightbox.find(\".lb-prevLink\").height(h),d.$lightbox.find(\".lb-nextLink\").height(h),d.showImage()}var d=this,e=this.$outerContainer.outerWidth(),f=this.$outerContainer.outerHeight(),g=a+this.containerPadding.left+this.containerPadding.right+this.imageBorderWidth.left+this.imageBorderWidth.right,h=b+this.containerPadding.top+this.containerPadding.bottom+this.imageBorderWidth.top+this.imageBorderWidth.bottom;e!==g||f!==h?this.$outerContainer.animate({width:g,height:h},this.options.resizeDuration,\"swing\",function(){c()}):c()},b.prototype.showImage=function(){this.$lightbox.find(\".lb-loader\").stop(!0).hide(),this.$lightbox.find(\".lb-image\").fadeIn(this.options.imageFadeDuration),this.updateNav(),this.updateDetails(),this.preloadNeighboringImages(),this.enableKeyboardNav()},b.prototype.updateNav=function(){var a=!1;try{document.createEvent(\"TouchEvent\"),a=!!this.options.alwaysShowNavOnTouchDevices}catch(a){}this.$lightbox.find(\".lb-nav\").show(),this.album.length>1&&(this.options.wrapAround?(a&&this.$lightbox.find(\".lb-prev, .lb-next\").css(\"opacity\",\"1\"),this.$lightbox.find(\".lb-prev, .lb-next\").show()):(this.currentImageIndex>0&&(this.$lightbox.find(\".lb-prev\").show(),a&&this.$lightbox.find(\".lb-prev\").css(\"opacity\",\"1\")),this.currentImageIndex<this.album.length-1&&(this.$lightbox.find(\".lb-next\").show(),a&&this.$lightbox.find(\".lb-next\").css(\"opacity\",\"1\"))))},b.prototype.updateDetails=function(){var b=this;if(void 0!==this.album[this.currentImageIndex].title&&\"\"!==this.album[this.currentImageIndex].title){var c=this.$lightbox.find(\".lb-caption\");this.options.sanitizeTitle?c.text(this.album[this.currentImageIndex].title):c.html(this.album[this.currentImageIndex].title),c.fadeIn(\"fast\").find(\"a\").on(\"click\",function(b){void 0!==a(this).attr(\"target\")?window.open(a(this).attr(\"href\"),a(this).attr(\"target\")):location.href=a(this).attr(\"href\")})}if(this.album.length>1&&this.options.showImageNumberLabel){var d=this.imageCountLabel(this.currentImageIndex+1,this.album.length);this.$lightbox.find(\".lb-number\").text(d).fadeIn(\"fast\")}else this.$lightbox.find(\".lb-number\").hide();this.$outerContainer.removeClass(\"animating\"),this.$lightbox.find(\".lb-dataContainer\").fadeIn(this.options.resizeDuration,function(){return b.sizeOverlay()})},b.prototype.preloadNeighboringImages=function(){if(this.album.length>this.currentImageIndex+1){(new Image).src=this.album[this.currentImageIndex+1].link}if(this.currentImageIndex>0){(new Image).src=this.album[this.currentImageIndex-1].link}},b.prototype.enableKeyboardNav=function(){a(document).on(\"keyup.keyboard\",a.proxy(this.keyboardAction,this))},b.prototype.disableKeyboardNav=function(){a(document).off(\".keyboard\")},b.prototype.keyboardAction=function(a){var b=a.keyCode,c=String.fromCharCode(b).toLowerCase();27===b||c.match(/x|o|c/)?this.end():\"p\"===c||37===b?0!==this.currentImageIndex?this.changeImage(this.currentImageIndex-1):this.options.wrapAround&&this.album.length>1&&this.changeImage(this.album.length-1):\"n\"!==c&&39!==b||(this.currentImageIndex!==this.album.length-1?this.changeImage(this.currentImageIndex+1):this.options.wrapAround&&this.album.length>1&&this.changeImage(0))},b.prototype.end=function(){this.disableKeyboardNav(),a(window).off(\"resize\",this.sizeOverlay),this.$lightbox.fadeOut(this.options.fadeDuration),this.$overlay.fadeOut(this.options.fadeDuration),a(\"select, object, embed\").css({visibility:\"visible\"}),this.options.disableScrolling&&a(\"html\").removeClass(\"lb-disable-scrolling\")},new b});\n//# sourceMappingURL=lightbox.min.map"
	}
});