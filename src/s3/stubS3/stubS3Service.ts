import S3Interface from "../interface";

export default class StubS3Service implements S3Interface {
    bucket: string
    constructor(bucket: string) {
        console.log("In constructor for Stub S3 Service")
        this.bucket = bucket;
    }
    async saveToS3(form: any) : Promise<any> {

        return new Promise<void>((resolve) => {
                console.log(`Pretending to save to S3 bucket "${this.bucket}"`);
                resolve();
            }
        )
    }
}
