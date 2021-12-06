export default interface SheetsInterface {
    appendValues(form: any, headerRange: string): Promise<void>
}
