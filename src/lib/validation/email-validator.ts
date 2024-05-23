// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import rfc822Validator from "rfc822-validate";

export default (email: string) => {
    if (!rfc822Validator(email)) {
        return false;
    } else {
        const domain = email.split("@")[1];
        return !(domain && domain.indexOf(".") === -1);
    }
};
