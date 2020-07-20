if (/^https:\/\/(.*)?\.atlassian\.net\/secure\/RapidBoard.jspa\?rapidView/gmi.test(window.location.href)) {
    const PAGE_UP = 33;
    const PAGE_DOWN = 34;
    const ARROW_UP = 38;
    const ARROW_DOWN = 40;

    $(document).ready(() => {
        $('.ghx-swimlane').not('.ghx-closed').each((_, elem) => $(elem).addClass('ghx-closed'));
        $('.ghx-swimlane').last().addClass('ghx-last')
        $('.ghx-swimlane.ghx-first').removeClass('ghx-closed');

        speak(name());

        $('body').keydown(({ keyCode, preventDefault }) => {
            preventDefault();
            const current = $('.ghx-swimlane:not(.ghx-closed)');
            const nextKeys = (keyCode === ARROW_DOWN || keyCode === PAGE_DOWN);
            const previousKeys = (keyCode === ARROW_UP || keyCode === PAGE_UP);

            if (nextKeys && !$(current).hasClass('ghx-last')) {
                $(current).addClass('ghx-closed');
                $(current).next().removeClass('ghx-closed');
                speak(name());
            }

            if (previousKeys && !$(current).hasClass('ghx-first')) {
                $(current).addClass('ghx-closed');
                $(current).prev().removeClass('ghx-closed');
                speak(name());
            }
        });
    });
}

const speak = (name) => {
    if ('speechSynthesis' in window) {

        var synthesis = window.speechSynthesis;

        // Get the first `en` language voice in the list
        var voice = synthesis.getVoices().filter(function (voice) {
            return voice.lang === 'en';
        })[0];

        // Create an utterance object
        var utterance = new SpeechSynthesisUtterance(name);

        // Set utterance properties
        utterance.voice = voice;
        utterance.pitch = 1.0;
        utterance.rate = 1.0;
        utterance.volume = 1;

        // Speak the utterance
        synthesis.speak(utterance);

    } else {
        console.log('Text-to-speech not supported.');
    }
}

const name = () => {
    return document.querySelector('.ghx-swimlane:not(.ghx-closed)')
        .querySelector('.ghx-swimlane-header')
        .querySelector('.ghx-heading').getAttribute('data-tooltip')
}