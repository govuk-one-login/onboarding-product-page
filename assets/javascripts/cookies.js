'use strict';

var cookieBanner = function () {
    const COOKIES_PREFERENCES_SET = "cookies_preferences_set";

    const cookiesAccepted = document.querySelector("#cookies-accepted");
    const cookiesRejected = document.querySelector("#cookies-rejected");
    const hideCookieBanner = document.querySelectorAll(".cookie-hide-button");
    const cookieBannerContainer = document.querySelector(".govuk-cookie-banner");
    const cookieBanner = document.querySelector("#cookies-banner-main");
    const acceptCookies = document.querySelector("#cookiesAccept");
    const rejectCookies = document.querySelector("#cookiesReject");
    const gaTrackingCode = document.querySelector("#ga-tracking");
    const cookiePreferencesExist =
        document.cookie.indexOf(COOKIES_PREFERENCES_SET + "=") > -1;

    function init() {
        if (isOnCookiesPage()) {
            cookiesPageInit();
            return;
        } else if (cookiePreferencesExist) {
            const analyticsEnabled = JSON.parse(getCookieValue(COOKIES_PREFERENCES_SET)).analytics;
            initGATagManager(analyticsEnabled);
            return;
        }

        showElement(cookieBannerContainer);

        acceptCookies.addEventListener(
            "click",
            function (event) {
                event.preventDefault();
                setCookie(COOKIES_PREFERENCES_SET, {"analytics": true});
                showElement(cookiesAccepted);
                hideElement(cookieBanner);
                initGATagManager(true);
            }.bind(this)
        );

        rejectCookies.addEventListener(
            "click",
            function (event) {
                event.preventDefault();
                setCookie(COOKIES_PREFERENCES_SET, {"analytics": false});
                showElement(cookiesRejected);
                hideElement(cookieBanner);
                initGATagManager(false);
            }.bind(this)
        );

        const hideButtons = Array.prototype.slice.call(hideCookieBanner);
        hideButtons.forEach(function(element) {
            element.addEventListener(
                "click",
                function (event) {
                    event.preventDefault();
                    hideElement(cookieBannerContainer);
                }.bind(this)
            );
        });
    }

    function setCookie(name, value) {
        const currentDate = new Date();
        const expiryDate = new Date(
            currentDate.setMonth(currentDate.getMonth() + 12)
        );
        document.cookie =
            name + "=" +
            JSON.stringify(value) +
            "; expires=" +
            expiryDate +
            "; path=/; Secure";
    }

    function hideElement(el) {
        el.style.display = "none";
    }

    function showElement(el) {
        el.style.display = "block";
    }

    function isOnCookiesPage() {
        return window.location.pathname.indexOf("cookies") !== -1;
    }

    function cookiesPageInit() {
        const cookie = getCookieValue(COOKIES_PREFERENCES_SET);
        var analyticsValue = false;

        if (!cookie) {
            setCookie(COOKIES_PREFERENCES_SET, {"analytics": false});
        } else {
            analyticsValue = JSON.parse(cookie).analytics;
            initGATagManager(analyticsValue);
        }

        document.querySelector("#policy-cookies-accepted").checked = analyticsValue;
        document.querySelector("#policy-cookies-rejected").checked = !analyticsValue;
        document.querySelector("#save-cookie-settings").addEventListener(
            "click",
            function (event) {
                event.preventDefault();
                const selectedPreference = document.querySelector("#radio-cookie-preferences input[type=\"radio\"]:checked").value;
                const analyticsEnabled = selectedPreference === "true";
                setCookie(COOKIES_PREFERENCES_SET, {"analytics": analyticsEnabled});
                initGATagManager(analyticsEnabled);

                showElement(document.querySelector("#save-success-banner"));
                if(analyticsEnabled){
                    showElement(document.querySelector("#policy-cookies-accepted-banner"));
                    hideElement(document.querySelector("#policy-cookies-rejected-banner"));
                }else{
                    hideElement(document.querySelector("#policy-cookies-accepted-banner"));
                    showElement(document.querySelector("#policy-cookies-rejected-banner"));
                }

                window.scrollTo(0, 0);
            }.bind(this)
        );
    }

    function initGATagManager(hasGivenConsent) {
        if (hasGivenConsent) {
            const script = document.createElement("script");

            script.type = "text/javascript";
            script.id = "google-tag-manager";
            script.src = "https://www.googletagmanager.com/gtag/js?id=" + gaTrackingCode.value;
            script.async = true;
            document.body.appendChild(script);

            window.dataLayer = window.dataLayer || [];

            function gtag() {
                dataLayer.push(arguments);
            }

            gtag('js', new Date());
            gtag('config', gaTrackingCode.value, {'anonymize_ip': true});
        } else {
            const scriptTag = document.querySelector("#google-tag-manager");
            if (scriptTag) {
                scriptTag.remove();
            }
            deleteCookie("_gid");
            deleteCookie("_ga");
            deleteCookie("_gat_gtag_" + gaTrackingCode.value.replace("-", "_"));
        }
    }

    function getCookieValue(cookieName) {
        const cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            const name = cookies[i].split('=')[0].toLowerCase().trim();
            const value = cookies[i].split('=')[1];
            if (name.indexOf(cookieName) !== -1) {
                return value;
            }
        }
        return undefined;
    }

    function deleteCookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    return {
        init: init
    };
};

if (window) {
    window.GOVSignin = window.GOVSignin || {};
    window.GOVSignin.CookieBanner = cookieBanner();
}
