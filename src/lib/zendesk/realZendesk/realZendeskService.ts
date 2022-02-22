import axios from 'axios'
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

    async submit(form:  Map<string, string>): Promise<boolean> {
        const URL = 'https://govuk.zendesk.com'

        let data = {
            "ticket": {
                "group_id": this.groupId,
                "tags": [this.tag],
                "subject": `${form.get('organisation-name')} | ${form.get('service-name')} | ${form.get('name')}`,
                "requester": {"name": form.get('name'), "email": form.get('email')},
                "comment": {
                    "value": `Organisation: ${form.get('organisation-name')}\nService: ${form.get('service-name')}\n${form.get('name')} (${form.get('role')})\n\n${form.get('how-can-we-help')}`
                }
            }
        }

        let instance = await axios.create({
            baseURL: URL,
            headers: {
                "Authorization": "Basic " + new Buffer(`${this.email}/token:${this.apiToken}`).toString('base64'),
                "Content-Type": "application/json"
            }
        });

        let sent: boolean = true;

        await instance.post('/api/v2/tickets.json', data)
            .then(function (response) {
                console.log(response)
                sent = true;
            })
            .catch(function (response) {
                sent = false
                console.log(response)
            });
        return sent;
    }
}
