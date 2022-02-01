import {Then} from "@cucumber/cucumber";
import {getLink, checkUrl} from './shared-functions';

Then('the Slack link will contain the correct URL', async function () {
  let slackLinkText: string = "Slack channel"
  let slackLinkUrl: string = "https://ukgovernmentdigital.slack.com/archives/C02AQUJ6WTC"

  let link = await getLink(this.page, slackLinkText);
  await checkUrl(this.page, link, slackLinkUrl);
});

Then('the email link will contain the correct URL', async function () {
  let emailLinkText: string = "govuk-sign-in@digital.cabinet-office.gov.uk"

  let link = await getLink(this.page, emailLinkText);
  await checkUrl(this.page, link, `mailto:${emailLinkText}`);
});

