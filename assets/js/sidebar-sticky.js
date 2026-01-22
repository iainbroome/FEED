const { on } = window.ivent;

let announcementBar = document.querySelector('#announcement-bar-root');
on(document, 'ready', () => {
	announcementBar = document.querySelector('#announcement-bar-root');
});

const sidebars = [];

document
	.querySelectorAll('.sidebar-navigation-container, .sidebar-widgets')
	.forEach((sidebar) => {
		const data = {
			sidebar,
			isTop: true,
			isBottom: false,
			minPosition: 0,
			maxPosition: 0,
			getMinPosition: () => sidebar.offsetTop,
			getMaxPosition: () =>
				sidebar.offsetTop + sidebar.offsetHeight - window.innerHeight,
		};

		data.minPosition = data.getMinPosition();
		data.maxPosition = data.getMaxPosition();

		sidebars.push(data);
	});

let lastScroll = window.scrollY;

function setPosition(sidebar, position = 'top') {
	if (position === 'top') {
		sidebar.style.top = '';
		sidebar.style.bottom = '';
		sidebar.style.position = '';
		sidebar.style.alignSelf = '';
	} else if (position === 'bottom') {
		sidebar.style.top = 'auto';
		sidebar.style.bottom = 0;
		sidebar.style.position = '';
		sidebar.style.alignSelf = 'end';
	} else if (position === 'relative') {
		const barHeight = announcementBar?.offsetHeight || 0;
		sidebar.style.top = `${sidebar.offsetTop - barHeight}px`;
		sidebar.style.bottom = '';
		sidebar.style.position = 'relative';
		sidebar.style.alignSelf = '';
	}
}

function handleScroll() {
	sidebars.forEach((data) => {
		if (
			data.sidebar.offsetHeight > window.innerHeight &&
			data.sidebar.offsetHeight < document.body.offsetHeight
		) {
			const position =
				data.isTop || data.isBottom ? data.sidebar.offsetTop : window.scrollY;

			// Scroll up.
			if (window.scrollY - lastScroll < 0) {
				if (data.isBottom) {
					setPosition(data.sidebar, 'relative');
					data.isBottom = false;
					data.minPosition = data.getMinPosition();
					data.maxPosition = data.getMaxPosition();
				} else if (position <= data.minPosition) {
					setPosition(data.sidebar, 'top');
					data.isTop = true;
				}

				// Scroll down.
			} else {
				if (data.isTop) {
					setPosition(data.sidebar, 'relative');
					data.isTop = false;
					data.minPosition = data.getMinPosition();
					data.maxPosition = data.getMaxPosition();
				} else if (position >= data.maxPosition) {
					setPosition(data.sidebar, 'bottom');
					data.isBottom = true;
				}
			}

			// Reset.
		} else if (!data.isTop) {
			setPosition(data.sidebar, 'top');
		}
	});

	lastScroll = window.scrollY;
}

function handleResize() {
	sidebars.forEach((data) => {
		if (
			data.sidebar.offsetHeight > window.innerHeight &&
			data.sidebar.offsetHeight < document.body.offsetHeight
		) {
			data.minPosition = data.getMinPosition();
			data.maxPosition = data.getMaxPosition();

			if (!data.isTop && !data.isBottom && lastScroll > data.maxPosition) {
				setPosition(data.sidebar, 'bottom');
				data.isBottom = true;
			}

			// Reset.
		} else if (!data.isTop) {
			setPosition(data.sidebar, 'top');
		}
	});
}

on(window, 'scroll', handleScroll);

on(window, 'resize', handleResize);
const observer = new ResizeObserver(handleResize);
sidebars.forEach(({ sidebar }) => {
	observer.observe(sidebar);
});
