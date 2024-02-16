import axios from "axios";
import ServicenowInterface from "../interface";
import {fetchOAuth2Token} from "../../oauth2Token";
import {ServiceNowCredentials} from "../../../../@types/serivcenowcredentials";

export default class RealServicenowService implements ServicenowInterface {
    async submit(form: Map<string, string>): Promise<boolean> {
        let postUrl = "";
        let token;
        let ticketIdentifier;
        if (process.env.SERVICENOW_URL) {
            postUrl = process.env.SERVICENOW_URL;
        }

        async function getToken(serviceNowCredentials: string): Promise<string | undefined> {
            function parseServiceNowCredentials(credentials: string): ServiceNowCredentials | undefined {
                try {
                    return JSON.parse(credentials) as ServiceNowCredentials;
                } catch (error) {
                    console.error("Failed to parse SERVICENOW_AUTH_CREDENTIALS");
                    return undefined;
                }
            }

            const credentials = parseServiceNowCredentials(serviceNowCredentials);

            if (credentials) {
                const {accessTokenUrl, clientId, clientSecret, username, password} = credentials;
                try {
                    const tokenResponse = await fetchOAuth2Token(accessTokenUrl, clientId, clientSecret, username, password);
                    return tokenResponse.access_token;
                } catch (error) {
                    console.error("Failed to fetch token");
                }
            } else {
                console.error("Invalid or missing SERVICENOW_AUTH_CREDENTIALS");
            }
        }

        if (process.env.SERVICENOW_AUTH_CREDENTIALS) {
            token = await getToken(process.env.SERVICENOW_AUTH_CREDENTIALS);
        }

        if (form.get("ticket-identifier")) {
            ticketIdentifier = `\n\n[Ticket Identifier]\n${form.get("ticket-identifier")}`;
        } else {
            ticketIdentifier = "";
        }

        const data = {
            short_description: `${form.get("organisation-name")} | ${form.get("service-name")} | ${form.get("name")}`,
            requester: {
                name: `${form.get("name")}`,
                email: `${form.get("email")}`
            },
            description: `[Contact form support]\n${form.get("contact-form-support")}\n\n[Name]\n${form.get("name")}\n\n[Role]\n${form.get(
                "role"
            )}\n\n[Organisation name]\n${form.get("organisation-name")}\n\n[Service name]\n${form.get(
                "service-name"
            )}\n\n[How can we help?]\n${form.get("how-can-we-help")} ${ticketIdentifier}`
        };

        const instance = axios.create({
            headers: {
                Authorization: "Bearer " + `${token}`,
                "Content-Type": "application/json"
            }
        });
        // eslint-disable-next-line
        let sent: boolean = true;
        await instance
            .post(postUrl, data)
            .then(function (response) {
                console.log("Servicenow service response status: ", response.status);
                console.log("Servicenow service response status text: ", response.statusText);
                sent = true;
            })
            .catch(function (response) {
                sent = false;
                console.log("Servicenow service response code: ", response.code);
                console.log("Servicenow service response status: ", response.cause);
            });
        return sent;
    }
}
