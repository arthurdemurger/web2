import React from 'react';
import './Header.css';

interface HeaderProps {
  title: string;
  url: string;
  children: React.ReactNode;
}

const Header = (props: HeaderProps) => {
  return (
    <header>
      <h1 className="animate__animated animate__bounce">{props.title}</h1>
      <div>
        {props.children}
      </div>
      <img src={props.url} alt="Header Image" />
    </header>
  );
}

export default Header;