const { on } = window.ivent;

function replaceCollapseAttr(element, nameAttr) {
	element.setAttribute(
		nameAttr,
		element.getAttribute(nameAttr).replace('collapse', 'dropdown'),
	);
}

// Copy and transform collapse toggle to dropdown toggle.
document
	.querySelectorAll('.sidebar-navigation .collapse-toggle')
	.forEach((collapseToggle) => {
		const parent = collapseToggle.parentNode;
		const toggle = collapseToggle.cloneNode(true);

		// Change classes.
		toggle.setAttribute('class', 'dropdown-toggle');

		// Aria label.
		toggle.innerHTML = '';
		toggle.setAttribute('aria-label', collapseToggle.textContent.trim());

		// Change attributes.
		toggle.setAttribute('aria-expanded', 'false');
		replaceCollapseAttr(toggle, 'aria-controls');
		replaceCollapseAttr(toggle, 'id');

		parent.appendChild(toggle);
	});

// Copy and transform collapse to dropdown.
document
	.querySelectorAll('.sidebar-navigation .collapse')
	.forEach((collapse) => {
		const parent = collapse.parentNode;
		const dropdown = collapse.cloneNode(true);

		// Change classes.
		dropdown.classList.remove('collapse', 'collapse-ready');
		dropdown.classList.add('dropdown', 'dropdown-ready');

		// Change attributes.
		replaceCollapseAttr(dropdown, 'aria-labelledby');
		replaceCollapseAttr(dropdown, 'id');

		parent.appendChild(dropdown);
	});
