if (window) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    /* global window document ga */
    window.DI = window.DI || {};
    window.DI.analyticsUa = window.DI.analyticsUa || {};
}

(function (analyticsConsent) {
    "use strict";

    const init = function () {
        const gaCookieDomainContainer = document.querySelector("#ga-cookie-domain");
        function hideElement(el) {
            el.classList.add("govuk-!-display-none");
        }
        function showElement(el) {
            el.classList.remove("govuk-!-display-none");
        }
        let analyticsValue = false;
        document.querySelector("#policy-cookies-accepted").checked = analyticsValue;
        document.querySelector("#policy-cookies-rejected").checked = !analyticsValue;
        document.querySelector("#save-cookie-settings").addEventListener(
            "click",
            function (event) {
                event.preventDefault();
                const selectedPreference = document.querySelector('#radio-cookie-preferences input[type="radio"]:checked').value;
                const analyticsEnabled = selectedPreference === "true";
                window.DI.analyticsGa4.cookie.setBannerCookieConsent(analyticsEnabled, gaCookieDomainContainer.value);
                showElement(document.querySelector("#save-success-banner"));
                if (analyticsEnabled) {
                    showElement(document.querySelector("#policy-cookies-accepted-banner"));
                    hideElement(document.querySelector("#policy-cookies-rejected-banner"));
                    document.getElementById("cookies-rejected").style.display = "none";
                } else {
                    hideElement(document.querySelector("#policy-cookies-accepted-banner"));
                    showElement(document.querySelector("#policy-cookies-rejected-banner"));
                    document.getElementById("cookies-accepted").style.display = "none";
                }
                window.scrollTo(0, 0);
            }.bind(this)
        );
    };
    analyticsConsent.init = init;
})(window.DI.analyticsUa);
