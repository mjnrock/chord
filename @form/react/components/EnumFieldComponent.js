import { EnumFieldType } from "../../EnumFieldType";

import { FieldInput } from "./fields/FieldInput";

export const EnumFieldComponent = {
	[ EnumFieldType.ANY ]: FieldInput,
	[ EnumFieldType.TEXT ]: FieldInput,
	[ EnumFieldType.NUMBER ]: FieldInput,
};

export default EnumFieldComponent;