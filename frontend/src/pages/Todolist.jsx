import { React, useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";

const token = localStorage.getItem("token");
const currentDate = new Date().toDateString();

function Todolist() {
  const { user, setUser } = useOutletContext();

  const [tasktodo, setTasktodo] = useState([]);
  const [taskwip, setTaskwip] = useState([]);
  const [taskdone, setTaskdone] = useState([]);

  // const [changeTask, setChangeTask] = useState({});

  const [userList, setuserList] = useState([]);

  const [statusList, setStatusList] = useState([]);

  const [newTask, setNewTask] = useState({
    task: "",
    ownername: "",
    ownerid: "",
    deadline: "",
  });

  const navigate = useNavigate();

  function handleDisconect() {
    setUser({});
    localStorage.clear();
    navigate("/");
  }

  async function fetchTodoList() {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/usertodolist/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      }
    );

    const todolistordered = res.data.sort((o1, o2) => {
      const date1 = new Date(o1.deadline);
      const date2 = new Date(o2.deadline);

      if (date1 < date2) {
        return -1; // o1 doit venir avant o2
      }
      if (date1 > date2) {
        return 1; // o1 doit venir après o2
      }
      return 0; // les dates sont égales, l'ordre reste inchangé
    });

    setTasktodo(todolistordered.filter((e) => e.status_id === 1));
    setTaskwip(todolistordered.filter((e) => e.status_id === 2));
    setTaskdone(todolistordered.filter((e) => e.status_id === 3));
  }

  async function fetchUserList() {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/userlist`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      }
    );
    setuserList(res.data);
  }

  async function fetchStatus() {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/status`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      }
    );
    setStatusList(res.data);
  }

  useEffect(() => {
    fetchTodoList();
    fetchUserList();
    fetchStatus();
  }, [user]);

  async function handleCheck(el, newstatus) {
    const task = {
      status_id: newstatus, // to change
      task: el.task,
      id: el.id,
    };

    // modification du status de la tâche en DB :

    await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/usertodolist`,
      task,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
        },
      }
    );

    fetchTodoList();
  }

  async function handleRemoveTask(e) {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/deletteByidTodolist/${e.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
    fetchTodoList();
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!newTask.task || !newTask.ownerid || !newTask.deadline) {
      alert("Merci de bien remplir tous les champs");
    } else {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/addtask`,
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token
          },
        }
      );

      fetchTodoList();
      setNewTask({
        ...newTask,
        task: "",
        ownername: "",
        ownerid: "",
        deadline: "",
      });
    }
  }

  // TO DO : sécuriser le rooter "secured route"

  return (
    <div className="todolist">
      <div className="title">TO DO LIST </div>
      <div className="deconnexionContainer">
        <button type="button" onClick={handleDisconect}>
          Déconnexion
        </button>
      </div>
      <div className="add" onSubmit={handleAdd}>
        <div className="text">Add a new task</div>
        <form action="">
          <input
            type="text"
            placeholder="description"
            value={newTask.task}
            onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
          />
          <select
            id="options"
            onChange={(e) => {
              setNewTask({
                ...newTask,
                ownerid: e.target.value,
              });
            }}
            value={newTask.ownerid}
          >
            <option value="" disabled>
              Porteur
            </option>
            {userList.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            style={{
              fontFamily: [
                "Gill Sans",
                "Gill Sans MT",
                "Calibri",
                "Trebuchet MS",
              ],
              fontSize: "2.6rem",
            }}
            value={newTask.deadline}
            placeholder="quand ?"
            onChange={(e) => {
              setNewTask({ ...newTask, deadline: e.target.value });
            }}
          />
          <input type="submit" />
        </form>
      </div>
      <div className="containerall">
        <div className="doit">
          <h2>Just fucking do it {user.name} ! </h2>
          <div className="tableContainer">
            {tasktodo.map((el) => (
              <div className="liste" key={el.id}>
                <select
                  id={`options_${el.id}`}
                  value={el.status_id}
                  onChange={(e) => handleCheck(el, e.target.value)}
                >
                  <option value="" disabled>
                    {el.status_description}
                  </option>
                  {statusList.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.description}
                    </option>
                  ))}
                </select>

                <li
                  className={
                    new Date(currentDate) >= new Date(el.deadline)
                      ? "late"
                      : "ontime"
                  }
                >
                  {new Date(el.deadline).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </li>
                <li className="todo">{el.task}</li>
                <button
                  type="button"
                  className="removeTask"
                  onClick={() => handleRemoveTask(el)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="separator" />
        <div className="wip">
          <h2>Finish the job {user.name} ! </h2>
          <div className="tableContainer">
            {taskwip.map((el) => (
              <div className="liste" key={el.id}>
                <select
                  id={`options_${el.id}`}
                  value={el.status_id}
                  onChange={(e) => handleCheck(el, e.target.value)}
                >
                  <option value="" disabled>
                    {el.status_description}
                  </option>
                  {statusList.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.description}
                    </option>
                  ))}
                </select>

                <li
                  className={
                    new Date(currentDate) >= new Date(el.deadline)
                      ? "late"
                      : "ontime"
                  }
                >
                  {new Date(el.deadline).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </li>
                <li className="wip">{el.task}</li>
                <button
                  type="button"
                  className="removeTask"
                  onClick={() => handleRemoveTask(el)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="separator" />
        <div className="done">
          <h2>Great Job {user.name} ! </h2>
          <div className="tableContainer">
            {taskdone.map((el) => (
              <div className="liste" key={el.id}>
                <select
                  id={`options_${el.id}`}
                  value={el.status_id}
                  onChange={(e) => handleCheck(el, e.target.value)}
                >
                  <option value="" disabled>
                    {el.status_description}
                  </option>
                  {statusList.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.description}
                    </option>
                  ))}
                </select>
                <li className="done">{el.task}</li>

                <button
                  type="button"
                  className="removeTask"
                  onClick={() => handleRemoveTask(el)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todolist;
