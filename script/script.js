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

document.addEventListener('DOMContentLoaded', function () {
	const carousel = document.getElementById('carousel');
	const inputs = carousel.lastElementChild.children;
	for (let i = 0; i < inputs.length; i+=2) {
		inputs[i].onchange = (function () {
			carousel.firstElementChild.firstElementChild.src = inputs[i].value;
		});
	}
	carousel.firstElementChild.children[1].onclick = function () {
		for (let i = inputs.length-2; i > 0; i -= 2) {
			if (flip_checked_radios(inputs[i], inputs[i - 2])) {
				return;
			}
		}
		flip_checked_radios(inputs[0], inputs[inputs.length - 2]);
	};
	carousel.firstElementChild.children[2].onclick = function () {
		for (let i = 0; i < inputs.length - 2; i += 2) {
			if (flip_checked_radios(inputs[i], inputs[i + 2])) {
				return;
			}
		}
		flip_checked_radios(inputs[inputs.length - 2], inputs[0]);
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
	}
});