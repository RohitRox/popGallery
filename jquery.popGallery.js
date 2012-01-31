/*!
 * jQuery popGallery v.1.0.0.beta - random popping gallery for jquery
 * Copyright(c) 2012 Rohit Joshi <link2j.roy@gmail.com>
 */
(function($){
    $.popGallery = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("popGallery", base);

        base.init = function(){
            base.options = $.extend({},$.popGallery.defaultOptions, options);

            // Initialization code here
            var cut_out = base.options.cut_out-1
            
            var arr = base.$el.find('li').slice(base.options.cut_out);
            
            var staging = [];
            
            arr.each( function(){
              staging.unshift($(this))
            });
            
            arr.remove();
            
            
            base.startshow(cut_out,staging);
            
            
        };
        
        base.startshow = function(cut_out,staging){
          setInterval(function(){
            
            var rand = randomFromTo(0,cut_out);
            
            console.log(rand);
            
            var got = $('li',base.$el).eq(rand);
            
            staging.unshift(got);
            console.log(staging);
            
     
            if(base.options.rotate == true && base.options.scale == true ) {
            
            got.replaceWith(staging.pop().transition({rotate: '360deg',scale: 1.5,opacity:0}).transition({scale: 1,opacity:1}).fadeIn('slow'));
            }
            else if(base.options.rotate == true) {
            
            got.replaceWith(staging.pop().transition({rotate: '360deg'}).fadeIn('slow'));
            }
            else if(base.options.scale == true){
               got.replaceWith(staging.pop().transition({scale: 1.5,opacity:0}).transition({scale: 1,opacity:1}).fadeIn('slow'));
            }
            else{
              got.replaceWith(staging.pop().fadeIn('slow'));
            }
            console.log(staging);
            
            }, base.options.speed );
        };
        

        // Run initializer
        base.init();
    };

    $.popGallery.defaultOptions = {
        speed: 3000,
        cut_out: 4,
        rotate: false,
        scale: false
    };

    $.fn.popGallery = function(options){
        return this.each(function(){
            (new $.popGallery(this, options));
        });
    };

})(jQuery);



function randomFromTo(from, to){
  return Math.floor(Math.random() * (to - from + 1) + from);
}