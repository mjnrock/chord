import { EnumFieldType } from "../../EnumFieldType.js";

import { FieldInput } from "./fields/FieldInput.jsx";

export const EnumFieldComponent = {
	[ EnumFieldType.ANY ]: FieldInput,
	[ EnumFieldType.TEXT ]: FieldInput,
	[ EnumFieldType.NUMBER ]: FieldInput,
};

export default EnumFieldComponent;