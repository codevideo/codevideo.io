import wrapWithProvider from './wrap-with-provider'
import './src/styles/globals.css'
import './src/styles/action-badges.css'
import mixpanel from "mixpanel-browser"
require('@radix-ui/themes/styles.css');

mixpanel.init("c8c5a06f15183f151523a4681b649e3b", {
    debug: false,
    track_pageview: true,
    persistence: "localStorage",
});

export const wrapRootElement = wrapWithProvider