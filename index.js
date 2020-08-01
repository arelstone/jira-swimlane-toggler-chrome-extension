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
        const swimlanes = document.querySelectorAll('.ghx-swimlane');

        swimlanes.forEach(elem => elem.classList.add('ghx-closed'));
        const last = swimlanes[swimlanes.length - 1];
        if (last) last.classList.add('ghx-last');
        swimlanes.forEach(elem => {
            if (elem.classList.contains('ghx-first')) {
                elem.classList.remove('ghx-closed');
            }
        });

        document.querySelectorAll('body, #content, #ghx-pool').forEach(elem =>
            elem.addEventListener('keydown', e => {
                const current = document.querySelector('.ghx-swimlane:not(.ghx-closed)');
                if (!current) return;

                const nextKeys = e.keyCode === ARROW_DOWN || e.keyCode === PAGE_DOWN;
                const previousKeys = e.keyCode === ARROW_UP || e.keyCode === PAGE_UP;
                if (nextKeys || previousKeys) e.preventDefault();

                const isFirst = current.classList.contains('ghx-first');
                const isLast = current.classList.contains('ghx-last');

                if (nextKeys && !isLast) {
                    current.classList.add('ghx-closed');
                    const next = current.nextElementSibling;
                    if (next) next.classList.remove('ghx-closed');
                }

                if (previousKeys && !isFirst) {
                    current.classList.add('ghx-closed');
                    const prev = current.previousElementSibling;
                    if (prev) prev.classList.remove('ghx-closed');
                }
            })
        );
    });
}