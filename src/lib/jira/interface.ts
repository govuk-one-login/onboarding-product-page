export interface JiraService {
    postJiraTicket: (TicketPayload: Map<string, string>) => Promise<JiraPostResponse>;
}

export type JiraPostResponse = {
    id: string;
    key: string;
    self: string;
};
