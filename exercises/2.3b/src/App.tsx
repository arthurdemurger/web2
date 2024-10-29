import Header from "./Header";
import { Main, User } from "./Main/index";
import Footer from "./Footer";

const App = () => {
	const title = "Welcome to My App";

	const name1 = "Alice";
	const age1 = 25;

	const name2 = "Bob";
	const age2 = 30;
	const name3 = "Charlie";
	const age3 = 35;

	const users: User[] = [
		{id: 1, name: name1, age: age1},
		{id: 2, name: name2, age: age2},
		{id: 3, name: name3, age: age3}
	];

	const footerText = "© 2023 My App";

	return (
	  <div>
		< Header title={title} />
		< Main users={users} />
		< Footer text={footerText} />
	  </div>
	);
  };

  export default App;
