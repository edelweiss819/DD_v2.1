import {scroller} from 'react-scroll';

export const scrollToElement = (
    elementName: string,
    duration = 500,
    delay = 0,
    smooth = 'easeInOutQuart',
    offset = 0
) => {
    scroller.scrollTo(elementName, {
        duration,
        delay,
        smooth,
        offset,
    });
};
