import { useState } from "react";

// App Component
export function App() {
  const [items, setItems] = useState([]);

  //function handel Add
  function handelAddItems(item) {
    setItems([...items, item]);
  }

  //fuction handel Delete
  function handelDeleteItems(id) {
    console.log(id);
    setItems(items.filter((item) => item.id !== id));
  }

  //function handel toggel item
  function handelToggelItem(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form itemsAdd={handelAddItems} />
      <Packing
        items={items}
        itemsDelete={handelDeleteItems}
        itemsToggel={handelToggelItem}
      />
      <Stats items={items} />
    </div>
  );
}
// End App

// logo start
function Logo() {
  return <h1>🌴 Far way 👜</h1>;
}
//logo end

//Form start
function Form({ itemsAdd }) {
  const [desc, setDesc] = useState("");
  const [quan, setQuan] = useState(1);

  function handelSubmit(e) {
    e.preventDefault();
    if (!desc) return;
    const newItem = { desc, quan, packed: false, id: Date.now() };
    itemsAdd(newItem);
    setDesc("");
    setQuan(1);
  }

  return (
    <form className="add-form" onSubmit={handelSubmit}>
      <h3 className="underline">what do you need for trip ?</h3>
      <select value={quan} onChange={(e) => setQuan(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
//Form end

// Packing start
function Packing({ items, itemsDelete, itemsToggel }) {
  return (
    <div className="list">
      <ul>
        {items.map((item, i) => (
          <Item
            item={item}
            key={i}
            itemsDelete={itemsDelete}
            itemsToggel={itemsToggel}
          />
        ))}{" "}
      </ul>
    </div>
  );
}

// Packing end

//Item start
function Item({ item, itemsDelete, itemsToggel }) {
  const { desc, quan, packed, id } = item;
  return (
    <li>
      <input type="checkbox" value={packed} onClick={() => itemsToggel(id)} />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quan} {desc}
      </span>
      <button onClick={() => itemsDelete(id)}>❌</button>
    </li>
  );
}
//Item end

//Stats start
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const precentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      {precentage === 100 ? (
        "You got everything! Ready to go ✈"
      ) : (
        <em>
          You have {numItems} items on your list, and you already packed ({" "}
          {numPacked} ) {precentage ? precentage + "%" : "(X%)"}
        </em>
      )}
    </footer>
  );
}
//Stats end
