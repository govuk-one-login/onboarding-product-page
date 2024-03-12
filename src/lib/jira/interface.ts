export interface JiraService {
    postJiraTicket: (ticketPayload: Map<string, string>) => Promise<JiraPostResponse>;
}

export type JiraPostResponse = {
    id: string;
    key: string;
    self: string;
};
