export default FormFields;

export enum InputType {
    Text = "TEXT",
    TextArea = "TEXT_AREA",
    Email = "EMAIL",
    Radios = "RADIOS"
}

export type FormFields = Map<string, FormField>;

export interface FormField {
    readonly name: string;
    readonly inputType: InputType;
    readonly missingValueMessage: string;
}

export function createFieldMap(fields: FormField[]): Map<string, FormField> {
    return new Map(fields.map(field => [field.name, field]));
}

export function getErrorId(fields: FormFields, name: string): string {
    const field = fields.get(name);

    if (field instanceof RadiosInput) {
        return field.items[0]?.id as string;
    }

    return name;
}

export interface RadioButton {
    readonly text: string;
    readonly value: string;
    readonly id?: string;
}

export class RadiosInput implements FormField {
    readonly name: string;
    readonly inputType: InputType;
    readonly missingValueMessage: string;
    readonly items: RadioButton[];

    constructor(name: string, missingValueMessage: string, items: RadioButton[]) {
        this.inputType = InputType.Radios;

        this.name = name;
        this.items = items;
        this.missingValueMessage = missingValueMessage;
    }
}
