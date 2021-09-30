# marketplace-test

## Cleanup notes and questions

(Using ms2art.github.io repo for now, just to test and investigate issues.)

* Should we use absolute or relative links?
 
* Putting the marketplace HTML files into GitHub in the same folders as those used for the kony files:

  - Kony: docs.kony.com/marketplace/newsandweather/Content/NewsandWeather/Introduction.htm

  - HCL: ms2art.github.io/marketplace-test/docs/marketplace/newsandweather/Content/NewsandWeather/Introduction.htm

  (resulting URL is "https://ms2art.github.io/marketplace-test/marketplace/newsandweather/Content/NewsandWeather/Introduction.htm")


* Links to the main Volt MX documentation pages, like this:

  http://docs.kony.com/konylibrary/konyfabric/kony_fabric_user_guide/Default.htm#Services.htm%23top?TocPath=Features|Integration%2520|_____0

  need to be transformed to:

  https://opensource.hcltechsw.com/volt-mx-docs/docs/documentation/Foundry/voltmx_foundry_user_guide/Content/Services.html

* I put the JS and CSS files in docs/marketplace/resources and adjusted paths in the HTML as needed. All the files seem to be found, but I'm seeing "uncaught exception" errors from require.js and MadCapAll.js.

* I downloaded Poppins-Light.woff and Poppins-Light.woff2 to the resources folder. These are free fonts.
