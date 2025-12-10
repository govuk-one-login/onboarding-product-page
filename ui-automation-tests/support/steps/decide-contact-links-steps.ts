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
    const contactUsUrl = "/support";

    const link = await getLink(this.page, contactUsText);
    await checkUrl(this.page, link, contactUsUrl);
});
