function flip_checked_radios(btn, nextBtn) {
	const flip = (btn.checked);
	if (flip) {
		btn.checked = false;
		nextBtn.checked = true;
		nextBtn.onchange();
	}
	return flip;
}

function flipDests(dest__frame, next__frame) {
	const flip = (getComputedStyle(dest__frame).display !== 'none') && (getComputedStyle(next__frame).display === 'none');
	if (flip) {
		dest__frame.style.display = 'none';
		next__frame.style.display = 'unset';
	}
	return flip;
}
function flipBanners(btn, nextBtn) {
	const flip = (btn.checked);
	if (flip) {
		nextBtn.checked = true;
		btn.onchange();
	}
	return flip;
}

document.addEventListener('DOMContentLoaded', function () {
	const carousel = document.getElementById('carousel');
	const inputs = carousel.lastElementChild.children;
	const banners = carousel.getElementsByTagName('img');
	for (let i = 0; i < inputs.length; i+=2) {
		inputs[i].onchange = function () {
			for (let j = 0; j < inputs.length; j+=2) {
				banners[j / 2].style.opacity = inputs[j].checked ? '1' : '0';
			}
		};
	}
	carousel.firstElementChild.children[6].onclick = function () {
		for (let i = inputs.length-2; i > 0; i -= 2) {
			if (flipBanners(inputs[i], inputs[i - 2])) {
				return;
			}
		}
		flipBanners(inputs[0], inputs[inputs.length - 2]);
	};
	carousel.firstElementChild.children[7].onclick = function () {
		for (let i = 0; i < inputs.length - 2; i += 2) {
			if (flipBanners(inputs[i], inputs[i + 2])) {
				return;
			}
		}
		flipBanners(inputs[inputs.length - 2], inputs[0]);
	};


	const destinations = document.getElementById('destinations');
	const dest__frames = destinations.children[1].children;
	destinations.lastElementChild.onclick = function () {
		for (let i = 0; i < dest__frames.length-1; i++) {
			if (flipDests(dest__frames[i], dest__frames[i+1])){
				return;
			}
		}
		flipDests(dest__frames[dest__frames.length-1], dest__frames[0]);
	};
	destinations.lastElementChild.previousElementSibling.onclick = function () {
		for (let i = dest__frames.length-1; i > 0; i--) {
			if (flipDests(dest__frames[i], dest__frames[i-1])){
				return;
			}
		}
		flipDests(dest__frames[0], dest__frames[dest__frames.length-1]);
	};
	addEventListener('resize', function () {
			if (window.screen.width > 614){
				for (let i = 0; i < dest__frames.length; i++) {
					dest__frames[i].style.display = '';
				}
			}
		}
	);

	setInterval(function(){carousel.firstElementChild.children[7].click();}, 5000);
});