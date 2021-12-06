import { PutObjectCommand } from "@aws-sdk/client-s3";

import { S3Client } from "@aws-sdk/client-s3";
import S3Service from "../interface";

export default class RealS3Service implements S3Service {
    REGION: string;
    bucket: string;
    constructor(bucket: string) {
        console.log("In constructor for real S3 service")
        this.REGION = process.env.AWS_REGION as string;
        this.bucket = bucket;
    }

    async saveToS3(form: any) : Promise<any> {

        let params = {
            Bucket: this.bucket,
            Key: form.id,
            Body: JSON.stringify(form)
        };

        try {
            let client = new S3Client({ region: this.REGION });
            const results = await client.send(new PutObjectCommand(params));
            console.log(
                "Successfully created " +
                params.Key +
                " and uploaded it to " +
                params.Bucket +
                "/" +
                params.Key
            );
            return results;
        } catch (err) {
            console.log("Error", err);
        }
    }
}
