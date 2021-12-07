export default interface SheetsInterface {
    appendValues(form: any, dataRange: string, headerRange: string): Promise<void>
}
