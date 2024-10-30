import Cinema from "../Cinema";
import Footer from "../Footer";
import logo from "../../assets/images/Kontu.png";
import Header from "../Header";

const App = () => {

	const cinema1Name = "UGC DeBrouckère";
	const pageTitle = "Informations sur les films dans les cinémas";

	const moviesCinema1 = [
	{
		title: "HAIKYU-THE DUMPSTER BATTLE",
		director: "Susumu Mitsunaka",
	},
	{
		title: "GOODBYE JULIA",
		director: "Mohamed Kordofani",
	},
	{
		title: "INCEPTION",
		director: "Christopher Nolan",
	},
	{
		title: "PARASITE",
		director: "Bong Joon-ho",
	},
	];

	const cinema2Name = "UGC Toison d'Or";

	const moviesCinema2 = [
	{
		title: "THE WATCHERS",
		director: "Ishana Night Shyamalan",
	},
	{
		title: "BAD BOYS: RIDE OR DIE",
		director: "Adil El Arbi, Bilall Fallah",
	},
	{
		title: "TENET",
		director: "Christopher Nolan",
	},
	{
		title: "THE IRISHMAN",
		director: "Martin Scorsese",
	}
	];



	return (
		<>
			<Header title={pageTitle} url={logo} children={null}/>

			<Cinema name={cinema1Name} movies= {moviesCinema1} />

			<Cinema name={cinema2Name} movies={moviesCinema2} />

			<Footer ownerName="Arthur D." year={2024} url={logo} children={null} />
		</>
	);
};


export default App;
