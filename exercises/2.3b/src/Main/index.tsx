interface User {
	id: number
	name: string;
	age: number;
}

interface MainProps {
	users: User[];
}

const Main = (props: MainProps) => {
	return (
	<div>
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Age</th>
				</tr>
			</thead>
			<tbody>
				{props.users.map((user) => {
					return (
					<tr key={user.id}>
						<td>{user.name}</td>
						<td>{user.age}</td>
					</tr>
					);
				})}
			</tbody>
		</table>
	</div>
	);
};

export { Main };
export type { User };
