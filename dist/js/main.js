jQuery(document).ready(function($){
    // Panel
    $(function () {
        $('.js-panel-toggle').click(function(e) {
          	e.preventDefault();

            var $this = $(this);

            if ($this.parent().hasClass('collapsed')) {
                $this.parent().find('.js-panel-content').slideDown(350);
                $this.parent().removeClass('collapsed');
            } else {
                $this.parent().find('.js-panel-content').slideUp(350);
                $this.parent().addClass('collapsed');
            }
        });
    });
    
    // Menu
	$(".js-nav-toggle").click(function(e){
        e.preventDefault();
        $(".js-nav").slideDown();
        $(this).hide();
        $(".js-nav-close").css('display','block');
        
    });
    $(".js-nav-close").click(function(e){
        e.preventDefault();
        $(".js-nav").hide();
        $(this).hide();
        $(".js-nav-toggle").css('display','block');
	});
    
    // Sliders
    $('.js-slider').slick({
        mobileFirst: true,
        responsive: [
        {
            breakpoint: 299,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                arrows:false,
                autoplay:true
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                arrows:false,
                //autoplay:true
            }
        }
        ]
    });
    
    $('.js-index-slider').slick({
        mobileFirst: true,
        responsive: [
        {
            breakpoint: 299,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                arrows:false,
                autoplay:true
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                arrows:true
            }
        }
        ]
    });

    $('.js-product-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: false,
        arrows:true
    });
    
    $(window).resize(function() {
        $('.js-slider').slick('resize');
        $('.js-index-slider').slick('resize');
        $('.js-product-slider').slick('resize');
    });

    $(window).on('orientationchange', function() {
        $('.js-slider').slick('resize');
        $('.js-index-slider').slick('resize');
        $('.js-product-slider').slick('resize');
    });
    
    // Masonry
    $('.js-grid').masonry({
        // options
        itemSelector: '.grid__col',
        percentPosition: true,
        columnWidth: '.grid__sizer'
    });
    
    var $grid = $('.js-grid').masonry({
        // options
        itemSelector: '.grid__col',
        percentPosition: true,
        columnWidth: '.grid__sizer'
    });
    $grid.masonry();
    
    // Show more
    $(function () {
        $(".js-more-toggle").on('click', function (e) {
            e.preventDefault();
            var list = $(this).parent().find(".js-more-list"),
                listItems = $(this).parent().find(".js-more-list .js-more-item"),
                listItemsHidden = $(this).parent().find(".js-more-list .js-more-item:hidden"),
                listItemsVisible = $(this).parent().find(".js-more-list .js-more-item:visible");
                
            if(list.hasClass('grid_tales')) {
                listItemsHidden.slice(0, 6).show();
                if (listItems.length == (listItemsVisible.length+6)) {
                    $(this).fadeOut();
                }            
            } else {
                listItemsHidden.slice(0, 1).show();
                if (listItems.length == (listItemsVisible.length+1)) {
                    $(this).fadeOut();
                }            
            }
            $grid.masonry();
        });
    });
    
    // Amount form
    $(function () {
        $(".js-amount-control").on("click", function() {
          var $button = $(this),
              oldValue = $button.parent().find(".js-amount-input").val();

          if ($button.attr('data-value') == "inc") {
        	  var newVal = parseFloat(oldValue) + 1;
        	} else {
      	   // Don't allow decrementing below zero
            if (oldValue > 0) {
              var newVal = parseFloat(oldValue) - 1;
      	    } else {
              newVal = 0;
            }
      	  }

          $button.parent().find(".js-amount-input").val(newVal);
        });
    });
    
    // Article section pushed to the right
    function articlePushedToTheRight() {
        var windowWidth = $(document).outerWidth(true),
            sectionWidth = $('.article__section_right .container').width(),
            pushValue = (windowWidth - sectionWidth)/2;
        $(".article__section_right .img-tea").css('margin-right', '-'+pushValue+'px');
    }
    articlePushedToTheRight();

    $(window).resize(function() {
        articlePushedToTheRight();
    });
});