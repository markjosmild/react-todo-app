import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [newList, setNewList] = new useState("");
  const [lists, setLists] = new useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(lists));
  }, [lists]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLists((currentLists) => {
      return [
        ...currentLists,
        { id: crypto.randomUUID(), taskName: newList, completed: false },
      ];
    });
    setNewList("");
  };
  const toggleTodo = (id, completed) => {
    setLists((current) => {
      return current.map((list) => {
        if (list.id === id) {
          return { ...list, completed };
        }
        return list;
      });
    });
  };
  const deleteThis = (id) => {
    setLists((thisS) => {
      return thisS.filter((hey) => hey.id !== id);
    });
  };
  return (
    <>
      <div className="flex flex-col gap-5">
        <h1>TODO LIST</h1>
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            required
            type="text"
            value={newList}
            onChange={(e) => {
              setNewList(e.target.value);
            }}
          />
          <button className="bg-green-700">Add</button>
        </form>
        <ul>
          {lists.length === 0 && "No task yet"}
          {lists.map((each) => {
            return (
              <li
                key={each.id}
                className="flex justify-center items-center gap-2"
              >
                <input
                  className=""
                  type="checkbox"
                  checked={each.completed}
                  onChange={(e) => toggleTodo(each.id, e.target.checked)}
                />
                <p>{each.taskName}</p>
                <button
                  className="bg-red-700 p-1 mb-2 flex-1"
                  onClick={() => deleteThis(each.id)}
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
