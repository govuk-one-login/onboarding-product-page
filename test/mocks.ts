import {Request, Response} from "express";
import Validation from "../src/lib/validation/validation";

import sinon = require("sinon");

export const renderSpy = sinon.spy();
export const redirectSpy = sinon.spy();

export const request = (properties?: Partial<Request> | object) =>
    ({
        body: {},
        session: {},
        app: {
            get: (keyName: string) => {
                if (keyName === "validation") return new Validation();
            }
        },
        params: {},
        ...properties
    } as Request);


export const response = (properties?: Partial<Response>) =>
    ({render: renderSpy, redirect: redirectSpy, locals: {}, ...properties} as Partial<Response> as Response);
