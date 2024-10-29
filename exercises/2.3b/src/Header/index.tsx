interface HeaderProps {
	title: string;
}

const Header = (props: HeaderProps) => {
	return (
	<div>
		<h1>{props.title}</h1>
	</div>
	);
};

export default Header;