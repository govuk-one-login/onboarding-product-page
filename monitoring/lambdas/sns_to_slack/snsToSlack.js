let AWS = require('aws-sdk');
require('axios');
const axios = require("axios");

exports.lambdaHandler = async (event, context) => {
    try {
        let message = event.Records[0].Sns.Message
        let payload = {
            "channel": process.env.SLACK_CHANNEL,
            "username": "Product Pages",
            "text": getMessage(message),
            "icon_emoji": ":canary-pie:"
        }

        let instance = await axios.create({
            baseURL: 'https://hooks.slack.com',
            headers: {
                "Content-Type": "application/json"
            }
        });

        let sent;
        let webhookPath = await webHook();
        await instance.post(webhookPath, payload)
            .then(function (response) {
                sent = true;
            })
            .catch(function (response) {
                sent = false
            });
        return `${ sent ? "sent " : "did not send " }\n${message}`;
    } catch (error) {
        console.log("Error sending message to slack");
        console.log(error);
    }
}

async function webHook() {
    let ssm = new AWS.SSM();
    let response = await ssm.getParameter({Name: process.env.WEBHOOK_PARAMETER_NAME, WithDecryption: true}).promise();
    return response.Parameter.Value;
}

function getMessage(rawMessage) {
    let snsMessage = JSON.parse(rawMessage);
    if(snsMessage.NewStateValue === 'OK') {
        if (snsMessage.OldStateValue === 'INSUFFICIENT_DATA') {
            return "Product pages canaries starting up"
        } else {
            return "Product pages appear to be working again"
        }
    } else {
        return "Product pages seem to have stopped working"
    }
}