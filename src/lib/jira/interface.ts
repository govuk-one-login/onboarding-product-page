export interface JiraService {
    postJiraTicket: (ticketPayload: Map<string, string | number>) => Promise<JiraPostResponse>;
}

export type JiraPostResponse = {
    id: string;
    key: string;
    self: string;
};

export type JiraStructuredContent = {
    version: number;
    type: string;
    content: JiraTicketContentSection[];
};

export type JiraCustomFieldPayload = JiraCustomFieldChoice;

export type JiraCustomFieldChoice = {
    self: string;
    value: string | number | undefined;
    id: string;
};

export type JiraTicketContentSection = {
    type: string;
    attrs?: {
        level: number;
    };
    content?: JiraTicketContentPayload[];
};

export type RegisterInterestFormPayload = Map<string, string | number>;

type JiraTicketContentPayload = {
    type: string;
    text?: string | undefined | number;
    marks?: JiraTicketContentPayloadMarks[];
};

type JiraTicketContentPayloadMarks = {
    type: string;
    attrs?: {
        href?: string;
    };
};

export interface JiraInterface {
    sendJiraTicket: () => Promise<void>;
}
