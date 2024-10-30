import './UserCard.css';

interface UserCardProps {
  name: string;
  age: number;
  isOnline: boolean;
}

const UserCard = (props: UserCardProps) => {
  return (
    <div className="user-card">
      <h3>{props.name}</h3>
      <h4>Age: {props.age}</h4>
      <div className={props.isOnline ? "online" : "offline"}>
        {props.isOnline ? "En ligne" : "Hors ligne"}
      </div>
    </div>
  );
}

export default UserCard;