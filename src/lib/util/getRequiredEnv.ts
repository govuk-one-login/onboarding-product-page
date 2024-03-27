import {RequiredEnvironmentVar} from "./EnvironmentVariable";

export const getRequiredEnv = (name: RequiredEnvironmentVar["name"]) => {
    const env = process.env[name];

    if (env === undefined || env === null) throw Error(`Missing environment variable: ${name}`);

    return env;
};
