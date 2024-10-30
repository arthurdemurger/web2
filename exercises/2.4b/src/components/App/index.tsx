import './App.css';
import UserCard from '../UserCard';

const App = () => {
  const user1 = { name: "Alex", age: 27, isOnline: false };
  const user2 = { name: "Adrien", age: 30, isOnline: true };
  const user3 = { name: "Antoine", age: 32, isOnline: false };

  return (
    <div className="app-container">
      <UserCard {...user1} />
      <UserCard {...user2} />
      <UserCard {...user3} />
    </div>
  );
};

export default App;