const { on } = window.ivent;

let popover = null;
let target = null;
let rafId = 0;

function setPosition() {
	if (!target || !popover) return;

	const rect = target.getBoundingClientRect();

	// Place popover above or below depending on target's vertical midpoint
	popover.classList.toggle(
		'popover-top',
		rect.top + rect.height / 2 > window.innerHeight / 2,
	);
}

function startRaf() {
	// Prevent multiple loops.
	if (rafId) {
		return;
	}

	const loop = () => {
		if (popover && target) {
			setPosition();
			rafId = requestAnimationFrame(loop);
		} else {
			rafId = 0; // Stop loop if nothing to track
		}
	};
	rafId = requestAnimationFrame(loop);
}

function stopRaf() {
	if (rafId) {
		cancelAnimationFrame(rafId);
		rafId = 0;
	}
}

on(document, 'mouseover', (event) => {
	const overTarget = event.target.closest('.popover-target');
	const overPopover = event.target.closest('.popover');

	// Hovered a target — switch to it (or keep the same one)
	if (overTarget) {
		if (overTarget !== target) {
			// Hide previous popover if any
			if (popover) popover.classList.add('popover-hide');

			target = overTarget;
			popover = target.nextElementSibling;
		}

		// Show and position the current popover
		if (popover) {
			popover.classList.remove('popover-hide');
			setPosition();
			startRaf();
		}
		return;
	}

	// If cursor is over the popover, keep it visible
	if (overPopover) return;

	// Left both target and popover — hide and stop rAF
	if (popover) popover.classList.add('popover-hide');
	popover = null;
	target = null;
	stopRaf();
});
