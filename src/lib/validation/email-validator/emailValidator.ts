import isRfc822Compliant from "./isRfc822Compliant";
import allowedEmailDomains from "./allowedEmailDomains";

export function isValidEmailAddress(emailAddress: string): boolean {
    return isRfc822Compliant(emailAddress);
}

export async function isGovernmentEmailAddress(emailAddress: string): Promise<boolean> {
    return (await allowedEmailDomains).filter((domain: string) => domain !== "" && emailAddress.endsWith(`.${domain}`)).length > 0;
}