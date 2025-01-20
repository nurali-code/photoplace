
$('.menu__open, .menu__close').on('click', function () {
	$('.menu__open, .header-menu, body').toggleClass('is_active')
})

$(window).on('scroll', function () {
	if (window.innerWidth >= 720) {
		if ($(this).scrollTop() > 0) { $('header').addClass('fixed'); }
		else { $('header').removeClass('fixed'); }
	}
});

$(document).ready(function () {
	$(".marquee-content").each(function () {
		const $clone = $(this).clone();
		$(this).after($clone);
	}); $(".marquee-content").addClass('--anim');


	interactivesSlider = $(this).find('.item-imgs');
	$('.item-imgs').slick({
		infinite: false,
		draggable: false,
		dots: false,
		arrows: true,
		slidesToShow: 1,
		adaptiveHeight: true,
	});

	if (window.innerWidth >= 992) {
		var itemWidth = $(".interactives .item").eq(0).width() / 2;
		var itemBoxWidth = $(".item-box").eq(0).css('transform', 'scale(1)').width() / 2;
		var calcVal = itemBoxWidth - itemWidth
		$(".item-box").eq(0).css('transform', '');

		$(".interactives .item").each(function () {
			var itemBox = $(this).find('.item-box');
			var offset = itemBox.offset().left;
			console.log();
			if (offset <= calcVal) {
				// itemBox.css('left', offset)
			}
		})
	}

	$(".interactives .item").on('mouseenter', function () {
		if (window.innerWidth >= 992) {
			$(".interactives .item").not($(this)).addClass('blur')
			// var itemBox = $(this).find('.item-box');

		}
	});
	$(".interactives .item").on('mouseleave', function () {
		if (window.innerWidth >= 992) {
			$(".interactives .item").removeClass('blur')
		}
	});

});


$('.sl').slick({
	vertical: true,
	infinite: true,
	draggable: false,
	dots: false,
	autoplay: true,
	autoplaySpeed: 1500,
	arrows: false,
	slidesToShow: 1,
	adaptiveHeight: true,
	responsive: [
		{
			breakpoint: 768,
			settings: { vertical: false, }
		},
	]
});

function compensateForScrollbar() {
	var scrollbarWidth = window.innerWidth - $(document).width();
	if ($('body').hasClass('overflow')) { $('body').css('margin-right', '0'); }
	else if (scrollbarWidth > 0) { $('body').css('margin-right', scrollbarWidth + 'px'); }
}
function showModal(id) {
	hideModals()
	compensateForScrollbar()
	$(id).addClass('active');
	$('body').addClass('overflow')
}
function hideModals() {
	$('.modal').removeClass('active');
	compensateForScrollbar()
	$('body').removeClass('overflow')
};
$(function () {
	$('a[href*="#modal-"]').on('click', function (e) {
		e.preventDefault()
		showModal($(this).attr("href"));
	});
	$('.modal__close').on('click', () => { hideModals(); });
	$(document).on('click', function (e) {
		if (!(
			($(e.target).parents('.modal-content').length) ||
			($(e.target).parents('.btn').length) ||
			($(e.target).parents('.connect__btn').length) ||
			($(e.target).hasClass('menu__link')) ||
			($(e.target).hasClass('connect__btn')) ||
			($(e.target).hasClass('btn')) ||
			($(e.target).hasClass('modal-content'))
		) && $('body').hasClass('overflow')) { hideModals(); }
	});
});

$('.connect__btn').on('click', function () {
	$('.connect-box, .connect__btn').toggleClass('is_active')
})

$(document).on('click', function (e) {
	if (!(($(e.target).parents('.connect').length) ||
		($(e.target).hasClass('connect'))
	) && $('.connect__btn').hasClass('is_active')) { $('.connect-box, .connect__btn').toggleClass('is_active') }
});

$(function () {
	if (window.innerWidth <= 720) {
		var xDown = null;
		var yDown = null;
		var isTouching = false;
		var modal = $('#modal-request');
		var modalContent = modal.find('.modal-content');

		var startUp = 0;
		var endUp = 0;
		$('.modal').on('touchstart', function (evt) {
			xDown = evt.touches[0].clientX;
			yDown = evt.touches[0].clientY;
			isTouching = true;
			startUp = evt.touches[0].clientY;
		});

		$('.modal').on('touchmove', function (evt) {
			if (!isTouching) { return; }

			var xUp = evt.touches[0].clientX;
			var yUp = evt.touches[0].clientY;
			var xDiff = xDown - xUp;
			var yDiff = yDown - yUp;

			if (Math.abs(xDiff) < Math.abs(yDiff)) {
				// При движении вниз
				endUp = -(startUp - yUp);
				if (yDiff > 0) { } else {
					if ($('body').hasClass('overflow')) {
						// Получаем текущую трансформацию translateY
						modalContent.css('transform', 'translateY(' + endUp + 'px)'); // Следуем за пальцем вниз
					}
				}
			}
			xDown = xUp;
			yDown = yUp;
		});

		$('.modal').on('touchend', function () {
			isTouching = false;
			if (endUp >= 200) {
				hideModals('#modal-request');
				setTimeout(() => {
					modalContent.css('transform', '');
					endUp = 0;
				}, 300);
			} else {
				modalContent.css('transform', 'translateY(' + 0 + 'px)'); // Следуем за пальцем вниз
			}

		});
	}
})