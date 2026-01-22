/**
 * Init features from our PVS framework.
 */

const { pvs } = window;

if (pvs) {
	pvs.initClipboard();
	pvs.initDarkMode();
	pvs.initPopup();
	pvs.initScrollProgress();
	pvs.initScrollbarWidth();
	pvs.initPagination();
	pvs.initCollapse();
	pvs.initDropdown();
	pvs.initPricingDiscount();
	pvs.initPricingUrlSync();
	pvs.registerLightbox({
		selector:
			'.post-featured-image > picture, .kg-gallery-container, .kg-image-card, .kg-gallery-image',
	});
	pvs.registerFeaturedVideo();
	pvs.registerFeaturedVideoPreview();
	pvs.registerTOC();
}
