interface FooterProps {
	text: string;
}

const Footer = (props: FooterProps) => {
	return (
	<div>
		<footer>{props.text}</footer>
	</div>
	);
};

export default Footer;