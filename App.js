import React, { useEffect, useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [newTask, setNewTask] = useState({
    user: "",
    status: "Not Started",
    date: "",
    priority: "Normal",
    comments: "",
  });

  const fetchTasks = () => {
    fetch("http://localhost:8081/api/tasks")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Fetch tasks error:", err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (task) => {
    setIsEditing(true);
    setEditTaskId(task.id);
    setNewTask({
      user: task.user,
      status: task.status,
      date: task.date,
      priority: task.priority,
      comments: task.comments,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (username) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      fetch(`http://localhost:8081/api/task/${username}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Delete failed");
          return res.text();
        })
        .then((msg) => {
          console.log("Success:", msg);
          fetchTasks();
        })
        .catch((err) => console.error("Delete error:", err));
    }
  };

  const handleSaveTask = () => {
    const url = isEditing
      ? `http://localhost:8081/api/task/${editTaskId}`
      : "http://localhost:8081/api/task";
    const method = isEditing ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Save task failed");
        return res.text();
      })
      .then(() => {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditTaskId(null);
        setNewTask({
          user: "",
          status: "Not Started",
          date: "",
          priority: "Normal",
          comments: "",
        });
        fetchTasks();
      })
      .catch((err) => console.error("Save task error:", err));
  };

  const filteredUsers = users.filter((item) =>
    item.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Tasks</h2>

      <div
        style={{
          marginBottom: "15px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <button
            style={{ marginRight: "10px", padding: "5px 10px" }}
            onClick={() => {
              setIsEditing(false);
              setNewTask({
                user: "",
                status: "Not Started",
                date: "",
                priority: "Normal",
                comments: "",
              });
              setIsModalOpen(true);
            }}
          >
            New Task
          </button>
          <button style={{ padding: "5px 10px" }} onClick={fetchTasks}>
            Refresh
          </button>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "5px", width: "200px" }}
        />
      </div>

      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((item) => (
              <tr key={item.id}>
                <td style={{ color: "#1976d2", cursor: "pointer" }}>
                  {item.user}
                </td>
                <td>{item.status}</td>
                <td>{item.date}</td>
                <td>{item.priority}</td>
                <td>{item.comments}</td>
                <td>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{ marginRight: "5px" }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.user)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" align="center">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3>{isEditing ? "Edit Task" : "New Task"}</h3>

            <div style={formGroupStyle}>
              <label>Assigned To</label>
              <input
                name="user"
                value={newTask.user}
                onChange={handleInputChange}
              />
            </div>

            <div style={formGroupStyle}>
              <label>Status</label>
              <select
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
              >
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div style={formGroupStyle}>
              <label>Due Date</label>
              <input
                type="date"
                name="date"
                value={newTask.date}
                onChange={handleInputChange}
              />
            </div>

            <div style={formGroupStyle}>
              <label>Priority</label>
              <select
                name="priority"
                value={newTask.priority}
                onChange={handleInputChange}
              >
                <option>Low</option>
                <option>Normal</option>
                <option>High</option>
              </select>
            </div>

            <div style={formGroupStyle}>
              <label>Description</label>
              <textarea
                name="comments"
                value={newTask.comments}
                onChange={handleInputChange}
                rows="4"
              />
            </div>

            <div style={{ textAlign: "right" }}>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ marginRight: "10px" }}
              >
                Cancel
              </button>
              <button onClick={handleSaveTask}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
};

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "15px",
};

export default App;
