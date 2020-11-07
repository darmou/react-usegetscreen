### REACT-USEGETSCREEN

This packagge provides a hook to provide some functions that you can use to determine the 
type of screen.  Mobile `isMobile`, Tablet `isTablet`, Desktop `isDesktop`

###### Install
```
npm install react-usegetscreen --save
yarn add react-usegetscreen
```

###### Example

```
import React, { Component } from 'react';
import { useGetScreen } from 'react-usegetscreen'

class Test = () => {
    
    { isMobile, isTablet, isDesktop } = useGetScreen();

    if (isMobile()) return <div>Mobile</div>;
    if (isTablet()) return <div>Tablet</div>;
    return <div>Desktop</div>;
}

export default Test;
```

It supports an options object containing following props:
- mobileLimit - Max width for mobile display. default = 468
- tabletLimit - Max width for tablet display. default=768
- shouldListenOnResize - Boolean describing whether it should listen on screen resize. default=true

