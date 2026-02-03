import pinoHttp from "pino-http";
import logger from "./logger";

interface ResponseWithRaw {
    statusCode: number;
    raw?: {
        getHeader: (name: string) => string | number | string[] | undefined;
    };
}

export const responseSerializer = (res: ResponseWithRaw) => ({
    statusCode: res.statusCode,
    headers: {
        "cache-control": res.raw?.getHeader("cache-control"),
        "last-modified": res.raw?.getHeader("last-modified"),
        etag: res.raw?.getHeader("etag"),
        "content-type": res.raw?.getHeader("content-type"),
        "content-length": res.raw?.getHeader("content-length")
    }
});

export const requestLoggingMiddleware = pinoHttp({
    logger,
    customProps: () => ({}),
    serializers: {
        res: responseSerializer
    }
});
