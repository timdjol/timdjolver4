$(function () {

	//lazy load
	var lazyLoadInstances = [];
	var lazyLazy = new LazyLoad({
		elements_selector: ".portfolio-item",
		callback_set: function (el) {
			var oneLL = new LazyLoad({
				container: el
			});
			lazyLoadInstances.push(oneLL);
		}
	});


	$('#portfolio_grid').mixItUp({
		animation: {
			effects: 'fade translateY(0)',
			duration: 700
		}
	});

	$(".portfolio ul li").click(function () {
		$(".portfolio ul li").removeClass("active");
		$(this).addClass("active");
	});

	$("nav").find('.toggle-mnu').click(function () {
		$(this).toggleClass("on");
		$("nav ul").slideToggle().toggleClass("active");
		$("body").toggleClass("active");
		return false;
	});

	$(window).scroll(function () {
		var $sections = $('.block');
		$sections.each(function (i, el) {
			var top = $(el).offset().top - 100;
			var bottom = top + $(el).height();
			var scroll = $(window).scrollTop();
			var id = $(el).attr('id');
			if (scroll > top && scroll < bottom) {
				$('nav ul li a.current').removeClass('current');
				$('a[href="#' + id + '"]').addClass('current');

			}
		})
	});

	//fixed menu
	$(window).scroll(function () {
		if ($(this).scrollTop() > 70) {
			$('header').fadeIn().addClass("fixed");
		} else {
			$('header').removeClass("fixed").animate('slow');
		}
	});

	if (window.matchMedia("(max-width: 767px)").matches) {
		$("nav ul").find('li').click(function () {
			$("nav ul").hide();
			$('.toggle-mnu').removeClass('on');
		});
	}

	var typed = new Typed('#typed', {
		strings: ['Разработка сайтов в Бишкеке', 'Настройка и запуск контектсной рекламы'],
		typeSpeed: 60,
		backSpeed: 50,
		smartBackspace: true, // this is a default
		loop: true
	});

	$('.about .num').each(function () {
		var $this = $(this);
		jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
			duration: 5000,
			easing: 'swing',
			step: function () {
				$this.text(Math.ceil(this.Counter));
			}
		});
	});

	const accordionBtns = document.querySelectorAll(".accordion");

	accordionBtns.forEach((accordion) => {
		accordion.onclick = function () {
			this.classList.toggle("is-open");

			let content = this.nextElementSibling;
			//console.log(content);

			if (content.style.maxHeight) {
				//this is if the accordion is open
				content.style.maxHeight = null;
			} else {
				//if the accordion is currently closed
				content.style.maxHeight = content.scrollHeight + "px";
				//console.log(content.style.maxHeight);
			}
		};
	});


	$('.owl-partners').owlCarousel({
		loop: true,
		dots: true,
		smartSpeed: 700,
		margin: 40,
		autoplay: false,
		autoplayTimeout: 1000,
		responsiveClass: true,
		responsive: {
			0: {
				items: 2
			},
			767: {
				items: 3
			},
			1200: {
				items: 5
			}
		}
	});

	$('.owl-reviews').owlCarousel({
		loop: false,
		smartSpeed: 700,
		margin: 20,
		autoplay: false,
		autoplayTimeout: 9000,
		dots: true,
		autoHeight: true,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 1
			},
			1200: {
				items: 1
			}
		}
	});

	$(".form-call").submit(function (event) { //Change
		var th = $(this);
		if (!event.preventDefault()) {
			$("#send").attr("disabled", true);
		}
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function () {
			th.find(".success").addClass("active");
			setTimeout(function () {
				// Done Functions
				th.find(".success").removeClass("active");
				th.trigger("reset");
				$("#send").attr("disabled", false);
				$.magnificPopup.close();
			}, 3000);
		});
		return false;
	});


	//copyright
	function copyLink() {
		var istS = 'Источник:'; // Слово должно находится в кавычках!
		var copyR = '© timdjol.com'; // Слово должно находится в кавычках!
		var body_element = document.getElementsByTagName('body')[0];
		var choose = window.getSelection();
		var myLink = document.location.href;
		var authorLink = "<br /><br />" + istS + ' ' + "<a href='" + myLink + "'>" + myLink + "</a><br />" + copyR;
		var copytext = choose + authorLink;
		var addDiv = document.createElement('div');
		addDiv.style.position = 'absolute';
		addDiv.style.left = '-99999px';
		body_element.appendChild(addDiv);
		addDiv.innerHTML = copytext;
		choose.selectAllChildren(addDiv);
		window.setTimeout(function () {
			body_element.removeChild(addDiv);
		}, 0);
	}
	document.oncopy = copyLink;

	let input = document.querySelector("#phone");
	let output = document.querySelector("#output");

	let iti = window.intlTelInput(input, {
		nationalMode: true,
		initialCountry: 'kg',
		onlyCountries: ["kg", "kz", "ru", "tj", "uz", "ua", "am", "us"],
		utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js" // just for formatting/placeholders etc
	});

	const handleChange = () => {
		let text;
		if (input.value) {
			text = iti.isValidNumber()
				? "Действительный номер " + iti.getNumber()
				: "Неверный номер - попробуйте еще раз";
		} else {
			text = "Пожалуйста, введите действительный номер";
		}
		if (iti.isValidNumber()) {
			output.classList.add("agree");
			document.getElementById("send").disabled = false;
		} else {
			output.classList.remove("agree");
			document.getElementById("send").disabled = true;
		}
		const textNode = document.createTextNode(text);
		output.innerHTML = "";
		output.appendChild(textNode);
	};

	input.addEventListener('change', handleChange);
	input.addEventListener('keyup', handleChange);


});
