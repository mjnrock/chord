export function FieldInput({ field, ...props }) {
	const { id, type, name, state } = field;
	return (
		<input
			id={ id }
			name={ name }
			type={ type }
			value={ state }
			{ ...field?.html }
			{ ...props }
		/>
	);
};

export default FieldInput;