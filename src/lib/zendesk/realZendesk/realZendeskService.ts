import axios from "axios";
import ZendeskInterface from "../interface";

export default class RealZendeskService implements ZendeskInterface {
    private email: string;
    private apiToken: string;
    private tag: string;
    private groupId: string;

    constructor(email: string, apiToken: string, tag: string, groupId: string) {
        this.email = email;
        this.apiToken = apiToken;
        this.tag = tag;
        this.groupId = groupId;
    }

    async submit(form: Map<string, string>): Promise<boolean> {
        const URL = "https://govuk.zendesk.com";
        let ticketIdentifier;

        if (form.get("ticket-identifier")) {
            ticketIdentifier = `\n\n[Ticket Identifier]\n${form.get("ticket-identifier")}`;
        } else {
            ticketIdentifier = "";
        }

        const data = {
            ticket: {
                group_id: this.groupId,
                tags: [this.tag],
                subject: `${form.get("organisation-name")} | ${form.get("service-name")} | ${form.get("name")}`,
                requester: {name: form.get("name"), email: form.get("email")},
                comment: {
                    value: `[Contact form support]\n${form.get("contact-form-support")}\n\n[Name]\n${form.get(
                        "name"
                    )}\n\n[Role]\n${form.get("role")}\n\n[Organisation name]\n${form.get(
                        "organisation-name"
                    )}\n\n[Service name]\n${form.get("service-name")}\n\n[How can we help?]\n${form.get(
                        "how-can-we-help"
                    )} ${ticketIdentifier}`
                }
            }
        };

        const instance = await axios.create({
            baseURL: URL,
            headers: {
                Authorization: "Basic " + new Buffer(`${this.email}/token:${this.apiToken}`).toString("base64"),
                "Content-Type": "application/json"
            }
        });
        // eslint-disable-next-line
        let sent: boolean = true;

        await instance
            .post("/api/v2/tickets.json", data)
            .then(function (response) {
                console.log(response);
                sent = true;
            })
            .catch(function (response) {
                sent = false;
                console.log(response);
            });
        return sent;
    }
}
