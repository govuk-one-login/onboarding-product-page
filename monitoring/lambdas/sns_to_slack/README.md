#SNS to Slack

This lambda subscribes to an SNS topic.

SNS delivers a notification which contains amongst other things a message.  The message is a stringified JSON object.

This lambda translates the message to something Slack will accept and then sends it to slack.