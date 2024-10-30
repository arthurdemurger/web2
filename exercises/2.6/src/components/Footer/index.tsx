import React from 'react';
import './Footer.css';

interface FooterProps {
	ownerName: string;
	year: number;
	url: string;
	children: React.ReactNode;
}

const Footer = (props: FooterProps) => {
	return (
		<footer>
			<h3>
				{props.ownerName} - {props.year}
			</h3>
			<div>
				{props.children}
			</div>
			<img src={props.url} alt="Footer Image" />
		</footer>
	);
}

export default Footer;