if (/^https:\/\/(.*)?\.atlassian\.net\/secure\/RapidBoard.jspa\?rapidView/gmi.test(window.location.href)) {
    const PAGE_UP = 33;
    const PAGE_DOWN = 34;
    const ARROW_UP = 38;
    const ARROW_DOWN = 40;

    $(document).ready(() => {
        $('.ghx-swimlane').not('.ghx-closed').each((_, elem) => $(elem).addClass('ghx-closed'));
        $('.ghx-swimlane').last().addClass('ghx-last')
        $('.ghx-swimlane.ghx-first').removeClass('ghx-closed');

        $('body').keydown(({ keyCode, preventDefault }) => {
            preventDefault();

            const current = $('.ghx-swimlane:not(.ghx-closed)');
            const nextKeys = (keyCode === ARROW_DOWN || keyCode === PAGE_DOWN);
            const previousKeys = (keyCode === ARROW_UP || keyCode === PAGE_UP);
            const isFirst = $(current).hasClass('ghx-first');
            const isLast = $(current).hasClass('ghx-last');

            if (nextKeys && !isLast) {
                $(current).addClass('ghx-closed');
                $(current).next().removeClass('ghx-closed');
            }

            if (previousKeys && !isFirst) {
                $(current).addClass('ghx-closed');
                $(current).prev().removeClass('ghx-closed');
            }
        });
    });
}