export default interface ZendeskInterface {
    submit(form: any): Promise<boolean>
}
