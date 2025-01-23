
$('.menu__open, .menu__close').on('click', function () {
	$('.menu__open, .header-menu, body').toggleClass('is_active')
})

$(window).on('scroll', function () {
	if (window.innerWidth >= 720) {
		if ($(this).scrollTop() > 0) { $('header').addClass('fixed'); }
		else { $('header').removeClass('fixed'); }
	}
});

$('[data-hor]').on('click', function () {
	setTimeout(() => {
		$('.fancybox-container').find('video').addClass('--hor')
	}, 50);
});


$(document).ready(function () {
	$(".marquee-content").each(function () {
		const $clone = $(this).clone();
		$(this).after($clone);
	}); $(".marquee-content").addClass('--anim');

	$('.interactives-slider').slick({
		infinite: false,
		dots: false,
		arrows: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		swipeToSlide: true,
		responsive: [
			{
				breakpoint: 1700,
				settings: {
					slidesToShow: 4,
					arrows: false,
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					arrows: false,
				}
			},
			{
				breakpoint: 992,
				settings: "unslick"
			},
		]
	}); $('.interactives-slider').on('swipe', function () { updateInteractiveItems() });

	$('.item-imgs').slick({
		infinite: false,
		draggable: true,
		dots: false,
		arrows: true,
		slidesToShow: 1,
		adaptiveHeight: true,
	});

	function updateInteractiveItems() {
		if (window.innerWidth >= 992) {
			const $items = $(".interactives .item");
			const itemWidth = $items.eq(0).width();
			const $firstItemBox = $(".item-box").eq(0).css('transform', 'scale(1)');
			const itemBoxWidth = $firstItemBox.width();
			const calcVal = (itemBoxWidth - itemWidth) / 2;
			$firstItemBox.css('transform', '');

			$items.each(function () {
				const $itemBox = $(this).find('.item-box');
				const offset = $itemBox.offset().left;
				const windWidth = offset + itemWidth * 2 + calcVal;
				$itemBox.removeClass('--right --left')
				$itemBox
					.toggleClass('--left', offset <= calcVal)
					.toggleClass('--right', windWidth >= window.innerWidth && offset > calcVal);
			});
		} else return false
	} updateInteractiveItems();
	$(window).on('resize', updateInteractiveItems);

	$(".interactives .item").on('mouseenter', function () {
		if (window.innerWidth >= 992) { $(".interactives .item").not($(this)).addClass('blur') }
	});
	$(".interactives .item").on('mouseleave', function () {
		if (window.innerWidth >= 992) { $(".interactives .item").removeClass('blur') }
	});

	$('[data-adjust]').each(function () { $(this).html(`<span>${$(this).html()}</span>`); });

	function adjustFontSize() {
		const windowWidth = $(window).width();
		const padding = windowWidth > 1500 ? 40 * 2 : windowWidth > 992 ? 43 * 2 : windowWidth > 720 ? 20 * 2 : 16 * 2;
		const maxFontSize = windowWidth > 1500 ? 386 : windowWidth > 992 ? 265 : windowWidth > 720 ? 148 : 71;

		$('[data-adjust] span').each(function () {
			const $span = $(this);
			let fontSize = parseInt($span.css('font-size'), 10);
			while ($span.outerWidth() >= windowWidth - padding && fontSize > 0) {
				$span.css('font-size', --fontSize + 'px');
			}
			while ($span.outerWidth() < windowWidth - padding && fontSize < maxFontSize) {
				$span.css('font-size', ++fontSize + 'px');
			}
			$span.css('font-size', fontSize = fontSize > maxFontSize ? maxFontSize : fontSize + 'px');
		});
	} adjustFontSize();
	$(window).resize(adjustFontSize);
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