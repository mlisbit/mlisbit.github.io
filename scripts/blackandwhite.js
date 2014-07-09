/** 
* 
* Version: 0.3.3 
* Author:  Gianluca Guarini
* Contact: gianluca.guarini@gmail.com
* Website: http://www.gianlucaguarini.com
* Twitter: @gianlucaguarini
*
* Copyright (c) Gianluca Guarini
*/
!function(a){a.fn.extend({BlackAndWhite:function(b){"use strict";var c=this,d=a.extend({hoverEffect:!0,webworkerPath:!1,invertHoverEffect:!1,speed:500,onImageReady:null,intensity:1},b),e=d.hoverEffect,f=d.webworkerPath,g=d.invertHoverEffect,h="number"==typeof d.intensity&&d.intensity<1&&d.intensity>0?d.intensity:1,i=(a.isPlainObject(d.speed)?d.speed.fadeIn:d.speed,a.isPlainObject(d.speed)?d.speed.fadeOut:d.speed),j=a(window),k="_"+(new Date).getTime(),l=(document.all&&!window.opera&&window.XMLHttpRequest?!0:!1," -webkit- -moz- -o- -ms- ".split(" ")),m={},n=function(a){if(m[a]||""===m[a])return m[a]+a;var b=document.createElement("div"),c=["","Moz","Webkit","O","ms","Khtml"];for(var d in c)if("undefined"!=typeof b.style[c[d]+a])return m[a]=c[d],c[d]+a;return a.toLowerCase()},o=function(){var a=document.createElement("div");return a.style.cssText=l.join("filter:blur(2px); "),!!a.style.length&&(void 0===document.documentMode||document.documentMode>9)}(),p=!!document.createElement("canvas").getContext,q=function(){return"undefined"!=typeof Worker?!0:!1}(),r=n("Filter"),s=[],t=q&&f?new Worker(f+"BnWWorker.js"):!1,u=function(b){a(b.currentTarget).find(".BWfade").stop(!0,!0).animate({opacity:g?0:1},i)},v=function(b){a(b.currentTarget).find(".BWfade").stop(!0,!0).animate({opacity:g?1:0},i)},w=function(a){"function"==typeof d.onImageReady&&d.onImageReady(a)},x=function(a){t&&p&&!o&&!a&&y()},y=function(){return s.length?(t.postMessage({imgData:s[0].imageData,intensity:h}),void(t.onmessage=function(a){s[0].ctx.putImageData(a.data,0,0),w(s[0].img),s.splice(0,1),y()})):(t.terminate&&t.terminate(),void(t.close&&t.close()))},z=function(a){return a.complete||"undefined"!=typeof a.naturalWidth&&a.naturalWidth},A=function(a,b,c,d){var e=b.getContext("2d"),f=0;e.drawImage(a,0,0,c,d);var g=e.getImageData(0,0,c,d),i=g.data,j=i.length;if(t)s.push({imageData:g,ctx:e,img:a});else{for(;j>f;f+=4){var k=.3*i[f]+.59*i[f+1]+.11*i[f+2];i[f]=~~(k*h+i[f]*(1-h)),i[f+1]=~~(k*h+i[f+1]*(1-h)),i[f+2]=~~(k*h+i[f+2]*(1-h))}e.putImageData(g,0,0),w(a)}},B=function(b,c){var d,e=b[0],f=(e.src,b.position()),i={top:f.top,left:f.left,position:"absolute","-webkit-transform":"translate3d(0,0,0)",opacity:g?0:1};e.crossOrigin="anonymous",p&&!o?(d=a('<canvas width="'+e.naturalWidth+'" height="'+e.naturalHeight+'" class="BWfade"></canvas>'),i.width=b.width(),i.height=b.height(),A(e,d.get(0),e.naturalWidth,e.naturalHeight)):(i[r]="grayscale("+100*h+"%)",d=b.clone().addClass("BWFilter BWfade"),w(e)),d.css(a.extend(i,{filter:"progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)"})).prependTo(c),!a.support.opacity&&g&&d.animate({opacity:0},0)},C=function(){c.each(function(b,c){var d=a(c).find("img"),e=a(d).width(),f=a(d).height();a(this).find("canvas").css({width:e,height:f})})},D=function(){var b=c.find("img").filter(function(){return!a(this).data("_b&w")}).length;c.each(function(c,d){var e=a(d),f=e.find("img");f.data("_b&w")||(z(f[0])?(b--,B(f,e)):f.on("load",function(){return f.data("_b&w_loaded")||!f[0].complete?void setTimeout(function(){f.load()},20):(B(f,e),f.data("_b&w_loaded",!0),b--,void x(b))}).load(),f.data("_b&w",!0))}),x(b),c.data("_b&w")||(e&&(c.on("mouseleave."+k,u),c.on("mouseenter."+k,v)),p&&!o&&j.on("resize."+k+" orientationchange."+k,C),c.data("_b&w",!0))},E=function(){c.off("."+k),j.off("."+k),c.removeData("_b&w")};return D(),{destroy:E}}})}(jQuery);