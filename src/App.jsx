import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = "https://dummyjson.com/users";
  async function getUsers() {
    try {
      setLoading(true);
      const response = await fetch(url);
      const { users } = await response.json();

      setUsers(users);
    } catch (erro) {
      console.log("Erro ao buscar dados");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>Usuários</h1>
      {loading == true ? "Carregando..." : null}

      {loading == false && users.length < 1
        ? "Nenhum usuário encontrado"
        : null}

      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            style={{ border: "1px solid purple", marginBottom: 15 }}
          >
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <p>Age: {user.age}</p>
            <p>Phone: {user.phone}</p>
            <p>University: {user.university}</p>
            <p>Domain: {user.domain}</p>
            <img src={user.image} alt="user image" width={100} height={100} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
