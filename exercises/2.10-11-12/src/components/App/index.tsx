import './App.css'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	return (
		<header>
			<NavBar />
		</header>
	);
}

const NavBar = () => {

	const navigate = useNavigate();

	return (
		<nav>
			<button onClick={() => navigate("/")}>Home</button>
			<button onClick={() => navigate("/cinema")}>Cinema</button>
			<button onClick={() => navigate("/movies")}>Movies</button>
		</nav>
	);
};

const Footer = () => (
	<footer>
		<p>Footer</p>
	</footer>
);

const App = () => (
	<div>
	  <Header />
	  <Outlet />
	  <Footer />
	</div>
);

export default App;
