import {Then} from "@cucumber/cucumber";
import {checkUrl, getLink} from "./shared-functions";

Then("the Slack link will contain the correct URL", async function () {
    const slackLinkText = "Slack channel";
    const slackLinkUrl = "https://ukgovernmentdigital.slack.com/archives/C02AQUJ6WTC";

    const link = await getLink(this.page, slackLinkText);
    await checkUrl(this.page, link, slackLinkUrl);
});

Then("the support form link on the main decide page will contain the correct URL", async function () {
    const contactUsText = "support form";
    const contactUsUrl = "https://onelogingovuk.service-now.com/csm?id=csm_sc_cat_item&sys_id=83902cb51b4822900a549978b04bcbed";

    const link = await getLink(this.page, contactUsText);
    await checkUrl(this.page, link, contactUsUrl);
});
