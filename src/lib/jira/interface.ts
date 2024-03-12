export interface JiraService {
    postJiraTicket: (ticketPayload: Map<string, string>) => Promise<JiraPostResponse>;
}

export type JiraPostResponse = {
    id: string;
    key: string;
    self: string;
};
export type JiraCustomFieldPayload = JiraCustomFieldChoice;

export type JiraCustomFieldChoice = {
    self: string;
    value: string | undefined;
    id: string;
};

export type JiraTicketContentSection = {
    type: string;
    attrs?: {
        level: number;
    };
    content?: JiraTicketContentPayload[];
};

type JiraTicketContentPayload = {
    type: string;
    text?: string | undefined;
    marks?: JiraTicketContentPayloadMarks[];
};

type JiraTicketContentPayloadMarks = {
    type: string;
    attrs?: {
        href?: string;
    };
};

