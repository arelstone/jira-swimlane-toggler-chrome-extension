if (/^https:\/\/(.*)?\.atlassian\.net\/secure\/RapidBoard.jspa\?rapidView/gmi.test(window.location.href)) {
    const PAGE_UP = 33;
    const PAGE_DOWN = 34;

    $(document).ready(() => {
        $('.ghx-swimlane').not('.ghx-closed').each((_, elem) => $(elem).addClass('ghx-closed'));
        $('.ghx-swimlane').last().addClass('ghx-last')

        $('.ghx-swimlane.ghx-first').removeClass('ghx-closed');

        $('body').keydown(({ keyCode, preventDefault }) => {
            preventDefault();
            const $current = $('.ghx-swimlane:not(.ghx-closed)')
            $($current).addClass('ghx-closed');
            if (keyCode === PAGE_DOWN) {
                if ($current.hasClass('ghx-last')) {
                    return;
                }


                $($current).next().removeClass('ghx-closed');
            }

            if (keyCode === PAGE_UP) {
                if ($current.hasClass('ghx-first')) {
                    return;
                }

                $($current).prev().removeClass('ghx-closed');
            }
        });
    });
}

