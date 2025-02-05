$('.menu__open, a.menu__link, .menu__close').on('click', function () {
	$('.menu__open, .header-menu, body').toggleClass('is_active')
})

// const loop = document.querySelectorAll('.observe');
// const options = { root: null, rootMargin: '0px', threshold: 0.1 };
// const observer = new IntersectionObserver(handleIntersection, options);
// loop.forEach(video => observer.observe(video));

// function handleIntersection(entries) {
// 	entries.forEach(entry => {
// 		const myVideo = entry.target;
// 		if (entry.isIntersecting) {
// 			myVideo.play();

// 			// Отключаем меню по правой кнопке мыши
// 			myVideo.addEventListener("contextmenu", function (e) {
// 				e.preventDefault();
// 				e.stopPropagation();
// 			}, false);

// 			// Удаляем атрибут controls, если он присутствует
// 			if (myVideo.hasAttribute("controls")) {
// 				myVideo.removeAttribute("controls");
// 			}
// 		} else { myVideo.pause(); }
// 	});
// }

$(window).on('scroll', function () {
	if ($(this).scrollTop() > 0) { $('header').addClass('fixed'); }
	else { $('header').removeClass('fixed'); }
});

$('a[href*="#"]').on('click', function (e) {
	e.preventDefault();
	$('html, body').animate({
		scrollTop: $($(this).attr('href')).offset().top - $('.header').innerHeight(),
	}, 350)
});

$('.hero-slides').slick({
	infinite: true,
	dots: false,
	fade: true,
	arrows: true,
	slidesToShow: 1,
	autoplay: true,
	autoplaySpeed: 1800,
	adaptiveHeight: true,
	responsive: [
		{
			breakpoint: 991,
			settings: "unslick"
		},
	]
});
$('.sl').slick({
	infinite: true,
	draggable: false,
	fade: true,
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

$('.btn-tab').on('click', function () {
	const selectedTab = $(this).data('tab');
	$('.btn-tab').removeClass('is_active');
	$(this).addClass('is_active');
	$('.example-wrap .item').each(function () {
		const hashtags = $(this).find('.item-title p').text();
		$(this).toggleClass('is_show', selectedTab === '#all' || hashtags.includes(selectedTab))
			.toggleClass('is_hide', selectedTab !== '#all' && !hashtags.includes(selectedTab));
	});
});

$(".example .item").on('mouseenter', function () {
	if (window.innerWidth >= 991 && $(this).find('video').length > 0) {
		$(this).find('video')[0].play(); // Вызов play() для видео
	}
});

$(".example .item").on('mouseleave', function () {
	if (window.innerWidth >= 991 && $(this).find('video').length > 0) {
		$(this).find('video')[0].pause(); // Вызов pause() для видео
	}
});

$(document).on('afterLoad.fb onSlideChange.fb', function (e, instance, slide) {
	const $video = slide.$content.find('source');
	slide.$content.removeClass('--hor --ver');
	if ($video.length > 0) {
		const src = $video.attr('src') || '';
		slide.$content.addClass(src.includes('hor-') ? '--hor' : '--ver');
	}
});
function adjustFontSize() {
	const windowWidth = $(window).width();
	const padding = windowWidth > 1500 ? 80 : windowWidth > 991 ? 86 : windowWidth > 720 ? 40 : 32;
	$('[data-adjust] span').each(function () {
		const $span = $(this);
		const isNone = $span.parent().attr('data-adjust') === 'none';
		let maxFontSize = isNone ? Infinity : windowWidth > 1500 ? 386 : windowWidth > 991 ? 265 : windowWidth > 720 ? 148 : 71;
		let fontSize = parseInt($span.css('font-size'), 10);
		while ($span.outerWidth() >= windowWidth - padding && fontSize > 0) {
			$span.css('font-size', --fontSize + 'px');
		}
		while ($span.outerWidth() < windowWidth - padding && fontSize < maxFontSize) {
			$span.css('font-size', ++fontSize + 'px');
		}
	});
}

$(document).ready(function () {
	// $('.example-wrap .item').each(function () {
	// 	const pTtag = $(this).find('.item-title p').eq(0).text() + " <br> " + $(this).find('.item-title p').eq(1).text();
	// 	$(this).find('[data-fancybox]').attr('data-caption', pTtag);
	// });


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
				settings: { slidesToShow: 4, }
			},
			{
				breakpoint: 1200,
				settings: { slidesToShow: 3, }
			},
			{
				breakpoint: 991,
				settings: "unslick"
			},
		]
	}); $('.interactives-slider').on('swipe', function () { updateInteractiveItems() });

	$('.item-imgs').slick({
		infinite: false,
		draggable: false,
		dots: false,
		arrows: true,
		slidesToShow: 1,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 991,
				settings: { draggable: true, }
			},
		]
	});
	$('.item-imgs').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		let nextSlideElement = $(slick.$slides[nextSlide]);
		if (nextSlideElement.is('video')) { nextSlideElement[0].play(); }
	});

	function updateInteractiveItems() {
		if (window.innerWidth >= 991) {
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
		if (window.innerWidth >= 991) {
			$('.interactives .slick-list').not('.item-imgs .slick-list').css('z-index', '1111')
			$(this).find('video').each(function () {
				$(this).hasClass('slick-current') ? $(this)[0].play() : false;
			})
			$(".interactives .item").not($(this)).addClass('blur')
		}
	});
	$(".interactives .item").on('mouseleave', function () {
		if (window.innerWidth >= 991) {
			$('.interactives .slick-list').not('.item-imgs .slick-list').css('z-index', '1')
			$(".interactives .item").removeClass('blur')
			$(this).find('video').each(function () { $(this)[0].pause() })
		}
	});

	$('[data-adjust]').each(function () { $(this).html(`<span>${$(this).html()}</span>`); });
	adjustFontSize();

});

$(window).resize(adjustFontSize);
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
	$('.modal-content').css('transform', '');
	$('.modal').removeClass('active');
	compensateForScrollbar()
	$('body').removeClass('overflow')
};

$(function () {
	$('[data-modal]').on('click', function (e) {
		showModal('#' + $(this).data("modal"));
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
		var currentModal = null; // Текущее модальное окно
		var currentModalContent = null; // Контент текущего модального окна

		var startUp = 0;
		var endUp = 0;

		// Обработка touchstart
		$(document).on('touchstart', '.modal', function (evt) {
			currentModal = $(this); // Запоминаем текущее модальное окно
			currentModalContent = currentModal.find('.modal-content'); // Находим его контент

			xDown = evt.touches[0].clientX;
			yDown = evt.touches[0].clientY;
			isTouching = true;
			startUp = evt.touches[0].clientY;
		});

		// Обработка touchmove
		$(document).on('touchmove', '.modal', function (evt) {
			if (!isTouching || !currentModal) return;

			var xUp = evt.touches[0].clientX;
			var yUp = evt.touches[0].clientY;
			var xDiff = xDown - xUp;
			var yDiff = yDown - yUp;

			if (Math.abs(xDiff) < Math.abs(yDiff)) {
				// При движении вниз
				endUp = -(startUp - yUp);
				if (yDiff > 0) {
					// Движение вниз
				} else {
					if ($('body').hasClass('overflow')) {
						currentModalContent.addClass('drag');
						// Получаем текущую трансформацию translateY
						currentModalContent.css('transform', 'translateY(' + endUp + 'px)');
					}
				}
			}
			xDown = xUp;
			yDown = yUp;
		});

		// Обработка touchend
		$(document).on('touchend', '.modal', function () {
			if (!currentModal) return;

			isTouching = false;
			currentModalContent.removeClass('drag');

			if (endUp >= 120) {
				hideModals(currentModal); // Закрываем текущее модальное окно
				setTimeout(() => {
					currentModalContent.css('transform', '');
					endUp = 0;
				}, 300);
			} else {
				currentModalContent.css('transform', 'translateY(0px)'); // Возвращаем контент на место
			}

			// Сбрасываем текущее модальное окно
			currentModal = null;
			currentModalContent = null;
		});

	}
});