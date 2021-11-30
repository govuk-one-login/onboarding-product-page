import S3Interface from "./interface";

export default class S3Service implements S3Interface {
    implementation!: S3Interface;
    bucket: string;

    constructor(bucket: string) {
        this.bucket = bucket;
    }

    async init() {
        if (process.env.USE_STUB_S3 == 'true') {
            console.log("Using Stub S3 Service")
            let module = await import('./stubS3/stubS3Service');
            let service = module.default;
            this.implementation = new service(this.bucket);
        } else {
            console.log("Using the actual implemntation of the S3 Service")
            let module = await import('./realS3/realS3Service');
            let service = module.default;
            this.implementation = new service(this.bucket);
        }
    }

    async saveToS3(form: any): Promise<any> {
        return this.implementation.saveToS3(form);
    }
}
