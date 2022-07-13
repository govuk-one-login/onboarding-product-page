import { SNSEvent } from 'aws-lambda'
import axios from 'axios';

export const canarySnsToSlackHandler = async (event: SNSEvent) => {
    try {
        const httpClient = axios.create({
            baseURL: "https://hooks.slack.com/",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const slackPayload = getSlackPayload(event);
        const webhookPath = process.env.SLACK_WEBHOOK_PATH!;
        return httpClient.post(webhookPath, slackPayload).then(() => {
            return "Successfully sent the Canary message to Slack";
        });
    } catch (error) {
        console.error("Error sending message to Slack");
        throw error;
    }
}

function getSlackPayload(event: SNSEvent): object {
    const message = getMessage(event.Records[0].Sns.Message);
    const productPageLink = `:govuk: <${process.env.PRODUCT_PAGE_URL}|View product pages>`

    return {
        channel: process.env.SLACK_CHANNEL,
        username: "DI Product Pages",
        icon_emoji: ":canary-pie:",
        attachments: [
            {
                color: message.colour,
                blocks: [
                    {
                        type: "section",
                        text: { type: "plain_text", text: message.text }
                    },
                    {
                        type: "context",
                        elements: [{ type: "mrkdwn", text: productPageLink }]
                    }
                ]
            }
        ]
    };
}

function getMessage(rawMessage: string) {
    const snsMessage = JSON.parse(rawMessage);

    if (snsMessage.NewStateValue !== 'OK') {
        return { text: "Product pages seem to have stopped working", colour: Colour.Red };
    }

    if (snsMessage.OldStateValue === 'INSUFFICIENT_DATA') {
        return { text: "Product pages canaries starting up", colour: Colour.Yellow };
    }

    return { text: "Product pages appear to be working again", colour: Colour.Green };
}

enum Colour {
    Green = "#36a64f",
    Yellow = "#f2c744",
    Red = "#d92e20"
}
