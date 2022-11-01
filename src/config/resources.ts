import path from "path";

const baseDir = path.join(__dirname, "../..");

export const resources = path.join(baseDir, "resources");
export const views = path.join(baseDir, "src/views");

export const config = {
    allowedDomains: path.join(resources, "allowed-email-domains.txt")
};

export const distribution = {
    assets: path.join(baseDir, "dist/assets"),
    images: path.join(baseDir, "assets/images")
};
