chrome.storage.local.get('enabled', data => {
    if (data.enabled) {
        //it is enabled, do accordingly

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

                    if (nextKeys && !$(current).hasClass('ghx-last')) {
                        $(current).addClass('ghx-closed');
                        $(current).next().removeClass('ghx-closed')
                    }

                    if (previousKeys && !$(current).hasClass('ghx-first')) {
                        $(current).addClass('ghx-closed');
                        return $(current).prev().removeClass('ghx-closed')
                    }
                });
            });
        }
    }
});
