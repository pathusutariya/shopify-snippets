(() => {

    const { mediaQueries } = Theme;
    if (!mediaQueries) return;
    const mqKeys = Object.keys(mediaQueries);
    const mqLists = {};
    window.Theme.mediaMatches = {};

    const handleMqChange = () => {
        const newMatches = mqKeys.reduce((acc, media) => {
            acc[media] = !!(mqLists[media] && mqLists[media].matches);
            return acc;
        }, {});

        // Update mediaMatches values after breakpoint change.
        Object.keys(newMatches).forEach((key) => {
            Theme.mediaMatches[key] = newMatches[key];
        });
        window.dispatchEvent(new CustomEvent('on:breakpoint-change'));
    };

    mqKeys.forEach((mq) => {
        mqLists[mq] = window.matchMedia(mediaQueries[mq]);
        Theme.mediaMatches[mq] = mqLists[mq].matches;
        try {
            mqLists[mq].addEventListener('change', handleMqChange);
        } catch (err1) {
            mqLists[mq].addListener(handleMqChange);
        }
    });
})();

(() => {
    Theme.elementUtil = {};

    Theme.elementUtil.remove = (elem) => {
        if (elem) {
            if (typeof elem.remove === 'function') {
                elem.remove();
            } else {
                elem.forEach((thisElem) => {
                    thisElem.remove();
                });
            }
        }
    };

    Theme.elementUtil.isInViewport = (elem) => {
        const rect = elem.getBoundingClientRect();
        return (Math.round(rect.top) >= 0 && Math.round(rect.left) >= 0 && Math.round(rect.bottom) <= (window.innerHeight || document.documentElement.clientHeight) && Math.round(rect.right) <= (window.innerWidth || document.documentElement.clientWidth));
    };
})();

function debounce(fn, wait = 300) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

// Change the selector below as added in header tag in your theme code.
var headerHeight = document.querySelector('.header').offsetHeight;
document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);

if (!customElements.get('sticky-scroll-direction')) {
    class StickyScrollDirection extends HTMLElement {
        connectedCallback() {
            this.init();
        }

        init() {
            // Change the selector below as added in header tag in your theme code.
            const headerIsSticky = document.querySelector('.header');
            this.headerHeight = Number.parseInt(getComputedStyle(this.parentElement).getPropertyValue('--header-height').replace('px', ''), 10);
            this.container = this.firstElementChild;
            this.currentTop = Number.parseInt(document.documentElement.scrollTop + this.getBoundingClientRect().top - this.offsetTop,10);
            this.defaultTop = headerIsSticky ? parseInt(this.headerHeight + 50, 10) : 48;
            this.scrollY = window.scrollY;
            this.minStickySize = this.dataset.minStickySize;
            this.toggleListeners();
            window.addEventListener('on:breakpoint-change', this.toggleListeners.bind(this));
        }

        toggleListeners() {
            if ((this.minStickySize === 'lg' && Theme.mediaMatches.lg) || (this.minStickySize === 'md' && Theme.mediaMatches.md)) {
                this.addListeners();
            } else {
                this.removeListeners();
            }
        }

        addListeners() {
            this.scrollListener = this.scrollListener || this.handleScroll.bind(this);
            window.addEventListener('scroll', this.scrollListener);
            this.scrollListener();
            // Set the height of the parent to the total height of other elements
            if (this.parentElement.dataset.stickyHeightElems) {
                this.debouncedSetStickyHeights = this.debouncedSetStickyHeights || debounce(this.setStickyHeight.bind(this), 500);
                window.addEventListener('resize', this.debouncedSetStickyHeights);

                if ('MutationObserver' in window) {
                    this.stickyHeightElems = this.parentElement.dataset.stickyHeightElems;
                    this.observer = new MutationObserver(this.debouncedSetStickyHeights);
                    document.querySelectorAll(this.stickyHeightElems).forEach((elem) => {
                        this.observer.observe(elem, {
                            childList: true,
                            attributes: true,
                            subtree: true
                        });
                    });
                }
                this.setStickyHeight();
            }

            this.disclosures = this.querySelectorAll('details');
            if (this.disclosures) {
                this.disclosureChangeHandler = this.disclosureChangeHandler
                    || this.handleDisclosureChange.bind(this);
                this.disclosures.forEach((disclosure) => {
                    disclosure.addEventListener('transitionend', this.disclosureChangeHandler);
                });
            }
        }

        handleDisclosureChange(evt) {
            if (evt.target.classList.contains('disclosure__panel')) {
                const summaryElem = evt.target.closest('.disclosure').querySelector('summary');
                if (!Theme.elementUtil.isInViewport(summaryElem)) {
                    window.scrollTo({
                        behavior: 'smooth',
                        top: summaryElem.getBoundingClientRect().top - document.body.getBoundingClientRect().top - this.headerHeight - 30
                    });
                }
            }
        }

        removeListeners() {
            this.container.style.top = '';
            window.removeEventListener('scroll', this.scrollListener);

            if (this.observer) {
                this.observer.disconnect();
                window.removeEventListener('resize', this.debouncedSetStickyHeights);
            }

            if (this.disclosures) {
                this.disclosures.forEach((disclosure) => {
                    disclosure.removeEventListener('transitionend', this.disclosureChangeHandler);
                });
            }
        }
        setStickyHeight() {
            var totalHeight = 0;
            document.querySelectorAll(this.stickyHeightElems).forEach((elem) => {
                totalHeight += elem.getBoundingClientRect().height;
            });
            this.parentElement.style.setProperty('--sticky-height', `${parseInt(totalHeight, 10)}px`);
        }

        handleScroll() {
            const bounds = this.container.getBoundingClientRect();
            const maxTop = bounds.top + window.scrollY - this.container.offsetTop + this.defaultTop;
            const minTop = this.container.clientHeight - window.innerHeight;

            if (window.scrollY < this.scrollY) {
                this.currentTop -= window.scrollY - this.scrollY;
            } else {
                this.currentTop += this.scrollY - window.scrollY;
            }
            this.currentTop = Math.min(Math.max(this.currentTop, -minTop), maxTop, this.defaultTop);
            this.currentTop = this.currentTop - 30;
            this.scrollY = window.scrollY;
            this.container.style.top = `${this.currentTop}px`;
        }
    }
    customElements.define('sticky-scroll-direction', StickyScrollDirection);
}
