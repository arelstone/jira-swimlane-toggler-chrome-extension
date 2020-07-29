function onDocumentReady(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

if (/^https:\/\/(.*)?\.atlassian\.net\/secure\/RapidBoard.jspa\?rapidView/gmi.test(window.location.href)) {
    const PAGE_UP = 33;
    const PAGE_DOWN = 34;
    const ARROW_UP = 38;
    const ARROW_DOWN = 40;

    onDocumentReady(() => {
        const swimlanes = Array.from(document.querySelectorAll('.ghx-swimlane'));

        swimlanes.forEach(elem => elem.classList.add('ghx-closed'));
        swimlanes.slice(-1)[0].classList.add('ghx-last');
        swimlanes.querySelector('.ghx-first').classList.remove('ghx-closed');

        document.querySelectorAll('body, #content, #ghx-pool').forEach(elem =>
            elem.addEventListener('keydown', ({ keyCode, preventDefault }) => {
                preventDefault();

                const current = document.querySelector('.ghx-swimlane:not(.ghx-closed)');
                const nextKeys = keyCode === ARROW_DOWN || keyCode === PAGE_DOWN;
                const previousKeys = keyCode === ARROW_UP || keyCode === PAGE_UP;
                const isFirst = current.classList.contains('ghx-first');
                const isLast = current.classList.contains('ghx-last');

                if (nextKeys && !isLast) {
                    current.classList.add('ghx-closed');
                    current.nextElementSibling.classList.remove('ghx-closed');
                }

                if (previousKeys && !isFirst) {
                    current.classList.add('ghx-closed');
                    current.previousElementSibling.classList.remove('ghx-closed');
                }
            })
        );
    });
}