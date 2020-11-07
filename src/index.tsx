import * as React from "react";
import * as _ from "lodash";

export interface withGetScreenOptions {
  mobileLimit: Number,
  tabletLimit: Number,
  shouldListenOnResize?: Boolean
}

export const defaultOptions: withGetScreenOptions = {
  mobileLimit: 468,
  tabletLimit: 768,
  shouldListenOnResize: true
}
export interface withGetScreenState {
  currentSize: ScreenType
}

export enum ScreenType {
  MOBILE,
  TABLET,
  DESKTOP
}

export function useGetScreen = (options = defaultOptions) => {

    const getSize = (size: Number): ScreenType => {
        if (size <= options.mobileLimit) {
            return ScreenType.MOBILE;
        } else if (size >= options.tabletLimit) {
            return ScreenType.DESKTOP;
        } else {
            return ScreenType.TABLET;
        }
    }
    const [currentSize, setCurrentSize] = React.useState<number>(getSize(window.innerWidth));
    const onResize = () => {
        const newSize = getSize(window.innerWidth);
        if (newSize !== currentSize) {
            setCurrentSize(newSize);
        }
    }

    const onResizeThrottle = _.throttle(onResize, 100);

    React.useEffect(() => {
        if (options.shouldListenOnResize) {
            window.addEventListener('resize', onResizeThrottle);
        }
    });

    React.useEffect(() => {
        if (options.shouldListenOnResize) {
            window.addEventListener('resize', onResizeThrottle);
        }
        return () => {
            // componentwillunmount in functional component.
            // Anything in here is fired on component unmount.
            onResizeThrottle.cancel()
            window.removeEventListener('resize', onResizeThrottle);
        }
    }, [options, onResizeThrottle]);

    const isMobile = () => {
      return currentSize === ScreenType.MOBILE;
    }
    const isTablet = () => {
      return currentSize === ScreenType.TABLET;
    }

    const isDesktop = () => {
      return currentSize === ScreenType.DESKTOP;
    }

    return { isMobile, isTablet, isDesktop };
}