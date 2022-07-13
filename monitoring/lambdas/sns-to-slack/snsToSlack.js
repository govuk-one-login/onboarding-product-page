const AWS = require('aws-sdk');
const axios = require('axios');

exports.lambdaHandler = async (event) => {
    try {
        let message = event.Records[0].Sns.Message;
        let payload = {
            "channel": process.env.SLACK_CHANNEL,
            "username": "Product Pages",
            "text": getMessage(message),
            "icon_emoji": ":canary-pie:"
        };

        let instance = axios.create({
            baseURL: 'https://hooks.slack.com',
            headers: {
                "Content-Type": "application/json"
            }
        });

        let webhookPath = await getWebHookPath();
        return instance.post(webhookPath, payload).then(() => {
            return "Successfully sent the Canary message to Slack"
        });
    } catch (error) {
        console.error("Error sending message to Slack");
        throw error;
    }
}

async function getWebHookPath() {
    let ssm = new AWS.SSM();
    let response = await ssm.getParameter({Name: process.env.WEBHOOK_PARAMETER_NAME, WithDecryption: true}).promise();
    return response.Parameter.Value;
}

function getMessage(rawMessage) {
    let snsMessage = JSON.parse(rawMessage);

    if (!snsMessage.hasOwnProperty('NewStateValue') || !snsMessage.hasOwnProperty('OldStateValue')) {
        console.error(snsMessage);
        throw `The message doesn't contain the expected fields: ${JSON.stringify(snsMessage)}`;
    }

    if (snsMessage.NewStateValue !== 'OK') {
        return "Product pages seem to have stopped working";
    }

    if (snsMessage.OldStateValue === 'INSUFFICIENT_DATA') {
        return "Product pages canaries starting up";
    }

    return "Product pages appear to be working again";
}
