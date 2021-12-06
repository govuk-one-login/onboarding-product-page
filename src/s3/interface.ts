export default interface S3Interface {
    saveToS3(form: any): Promise<any>
}
