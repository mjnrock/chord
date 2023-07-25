export function Field({ field }) {
	return (
		<div className="flex flex-col">
			<div className="flex flex-row">
				<div className="font-bold">Name:</div>
				<div>{ field.name }</div>
			</div>
			<div className="flex flex-row">
				<div className="font-bold">Type:</div>
				<div>{ field.type }</div>
			</div>
			<div className="flex flex-row">
				<div className="font-bold">State:</div>
				<div>{ JSON.stringify(field.state) }</div>
			</div>
		</div>
	);
};

export default Field;