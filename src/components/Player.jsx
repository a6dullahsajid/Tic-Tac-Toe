import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onNameChange}) {
  const [name, setname] = useState(initialName);
  const [editing, setEditing] = useState(false);
  let playerName = <span className="player-name">{name}</span>;
  let buttonName = <button onClick={handleEditClick}>Edit</button>;
  function handleEditClick() {
    setEditing((editing) => !editing);
    onNameChange(symbol,name);
  }
  function handleChange(event) {
    setname(event.target.value);
  }
  if (editing) {
    playerName = (
      <input type="text" value={name} onChange={handleChange} required />
    );
    buttonName = <button onClick={handleEditClick}>Save</button>;
  }
  return (
    <li className={isActive == symbol ? 'active' : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      {buttonName}
    </li>
  );
}
