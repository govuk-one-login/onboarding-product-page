import helmet from "helmet";

export default function Helmet() {
    return helmet({
        referrerPolicy: {
            policy: ["strict-origin"]
        },
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: [
                    "'self'",
                    "'unsafe-inline'",
                    "https://www.googletagmanager.com",
                    "https://www.google-analytics.com",
                    "https://ssl.google-analytics.com"
                ],
                styleSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "https://www.googletagmanager.com", "https://www.google-analytics.com"],
                objectSrc: ["'none'"],
                connectSrc: ["'self'", "https://www.google-analytics.com"],
                formAction: [
                    "'self'",
                    "https://signin.account.gov.uk/contact-us",
                    "https://onelogingovuk.service-now.com/csm?id=csm_sc_cat_item&sys_id=83902cb51b4822900a549978b04bcbed",
                    "https://home.account.gov.uk/contact-gov-uk-one-login"
                ]
            }
        },
        dnsPrefetchControl: {
            allow: false
        },
        frameguard: {
            action: "deny"
        },
        hsts: {
            maxAge: 31536000, // 1 Year
            preload: true,
            includeSubDomains: true
        },
        permittedCrossDomainPolicies: false
    });
}
