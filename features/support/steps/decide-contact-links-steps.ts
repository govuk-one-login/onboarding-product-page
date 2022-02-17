import {Then} from "@cucumber/cucumber";
import {getLink, checkUrl} from './shared-functions';

Then('the Slack link will contain the correct URL', async function () {
  let slackLinkText: string = "Slack channel"
  let slackLinkUrl: string = "https://ukgovernmentdigital.slack.com/archives/C02AQUJ6WTC"

  let link = await getLink(this.page, slackLinkText);
  await checkUrl(this.page, link, slackLinkUrl);
});

Then('the online form link on the main decide page will contain the correct URL', async function () {
  let contactUsText: string = "online form"
  let contactUsUrl: string = "/contact-us"

  let link = await getLink(this.page,  contactUsText);
  await checkUrl(this.page, link, contactUsUrl);
});
