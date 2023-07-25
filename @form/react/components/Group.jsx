import { EnumFieldType } from "../../EnumFieldType";

import { Field } from "./Field";

export function Group({ field }) {
	if(field.type !== EnumFieldType.GROUP) {
		return null;
	}

	return (
		<div className="flex flex-col gap-2 m-2">
			{ field.state.map((field) => (
				<div className="flex flex-row p-2 border border-solid rounded border-neutral-200" key={ field.id }>
					{
						field.type === EnumFieldType.GROUP ? (
							<Group
								key={ field.id }
								field={ field }
							/>
						) : (
							<Field
								key={ field.id }
								field={ field }
							/>
						)
					}
				</div>
			)) }
		</div>
	);
};

export default Group;