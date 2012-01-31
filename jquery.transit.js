/*!
 * jQuery Transit - CSS3 transitions and transformations
 * Copyright(c) 2011 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function(d){function j(a){var b=["Moz","Webkit","O","ms"],c=a.charAt(0).toUpperCase()+a.substr(1);if(a in k.style)return a;for(a=0;a<b.length;++a){var d=b[a]+c;if(d in k.style)return d}}function i(a){"string"===typeof a&&this.parse(a);return this}function q(a,b,c){!0===b?a.queue(c):b?a.queue(b,c):c()}function m(a){var b=[];d.each(a,function(a){a=d.camelCase(a);a=d.transit.propertyMap[a]||a;a=s(a);-1===d.inArray(a,b)&&b.push(a)});return b}function r(a,b,c,p){a=m(a);d.cssEase[c]&&(c=d.cssEase[c]);
var f=""+n(b)+" "+c;0<parseInt(p,10)&&(f+=" "+n(p));var h=[];d.each(a,function(a,b){h.push(b+" "+f)});return h.join(", ")}function e(a,b){b||(d.cssNumber[a]=!0);d.transit.propertyMap[a]=h.transform;d.cssHooks[a]={get:function(b){return(d(b).css("transform")||new i).get(a)},set:function(b,h){var f=d(b).css("transform")||new i;f.setFromString(a,h);d(b).css({transform:f})}}}function s(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function g(a,b){return"string"===typeof a&&!a.match(/^[\-0-9\.]+$/)?
a:""+a+b}function n(a){d.fx.speeds[a]&&(a=d.fx.speeds[a]);return g(a,"ms")}d.transit={version:"0.1.2+",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:!0,useTransitionEnd:!0};var k=document.createElement("div"),t=-1<navigator.userAgent.toLowerCase().indexOf("chrome"),h={transition:j("transition"),transitionDelay:j("transitionDelay"),transform:j("transform"),
transformOrigin:j("transformOrigin")};d.extend(d.support,h);var o=h.transitionEnd={MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"}[h.transition]||null,k=null;d.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)"};d.cssHooks.transform={get:function(a){return d(a).data("transform")},set:function(a,b){var c=b;c instanceof i||(c=new i(c));a.style[h.transform]="WebkitTransform"===
h.transform&&!t?c.toString(!0):c.toString();d(a).data("transform",c)}};d.cssHooks.transformOrigin={get:function(a){return a.style[h.transformOrigin]},set:function(a,b){a.style[h.transformOrigin]=b}};e("scale");e("translate");e("rotate");e("rotateX");e("rotateY");e("rotate3d");e("perspective");e("skewX");e("skewY");e("x",!0);e("y",!0);i.prototype={setFromString:function(a,b){var c="string"===typeof b?b.split(","):b.constructor===Array?b:[b];c.unshift(a);i.prototype.set.apply(this,c)},set:function(a){var b=
Array.prototype.slice.apply(arguments,[1]);this.setter[a]?this.setter[a].apply(this,b):this[a]=b.join(",")},get:function(a){return this.getter[a]?this.getter[a].apply(this):this[a]||0},setter:{rotate:function(a){this.rotate=g(a,"deg")},rotateX:function(a){this.rotateX=g(a,"deg")},rotateY:function(a){this.rotateY=g(a,"deg")},scale:function(a,b){void 0===b&&(b=a);this.scale=a+","+b},skewX:function(a){this.skewX=g(a,"deg")},skewY:function(a){this.skewY=g(a,"deg")},perspective:function(a){this.perspective=
g(a,"px")},x:function(a){this.set("translate",a,null)},y:function(a){this.set("translate",null,a)},translate:function(a,b){if(void 0===this._translateX)this._translateX=0;if(void 0===this._translateY)this._translateY=0;if(null!==a)this._translateX=g(a,"px");if(null!==b)this._translateY=g(b,"px");this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var a=(this.scale||"1,1").split(",");a[0]&&
(a[0]=parseFloat(a[0]));a[1]&&(a[1]=parseFloat(a[1]));return a[0]===a[1]?a[0]:a},rotate3d:function(){for(var a=(this.rotate3d||"0,0,0,0deg").split(","),b=0;3>=b;++b)a[b]&&(a[b]=parseFloat(a[b]));a[3]&&(a[3]=g(a[3],"deg"));return a}},parse:function(a){var b=this;a.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(a,d,f){b.setFromString(d,f)})},toString:function(a){var b=[],c;for(c in this)this.hasOwnProperty(c)&&"_"!==c[0]&&(a&&"scale"===c?b.push(c+"3d("+this[c]+",1)"):a&&"translate"===c?b.push(c+"3d("+
this[c]+",0)"):b.push(c+"("+this[c]+")"));return b.join(" ")}};d.fn.transition=d.fn.transit=function(a,b,c,e){var f=this,g=0,i=!0;"function"===typeof b&&(e=b,b=void 0);"function"===typeof c&&(e=c,c=void 0);if("undefined"!==typeof a.easing)c=a.easing,delete a.easing;if("undefined"!==typeof a.duration)b=a.duration,delete a.duration;if("undefined"!==typeof a.complete)e=a.complete,delete a.complete;if("undefined"!==typeof a.queue)i=a.queue,delete a.queue;if(a.delay)g=a.delay,delete a.delay;if("undefined"===
typeof b)b=d.fx.speeds._default;if("undefined"===typeof c)c=d.cssEase._default;var b=n(b),j=r(a,b,c,g),l=d.transit.enabled&&h.transition?parseInt(b,10)+parseInt(g,10):0;if(0===l)return q(f,i,function(b){f.css(a);e&&e();b()}),f;var k={},m=function(b){var c=!1,g=function(){c&&f.unbind(o,g);0<l&&f.each(function(){this.style[h.transition]=k[this]||null});"function"===typeof e&&e.apply(f);"function"===typeof b&&b()};0<l&&o&&d.transit.useTransitionEnd?(c=!0,f.bind(o,g)):window.setTimeout(g,l);f.each(function(){0<
l&&(this.style[h.transition]=j);d(this).css(a)})};q(f,i,function(a){var b=0;"MozTransition"===h.transition&&25>b&&(b=25);window.setTimeout(function(){m(a)},b)});return this};d.transit.getTransitionValue=r})(jQuery);