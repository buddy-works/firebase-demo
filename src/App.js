import React from "react";
import { hot } from "react-hot-loader/root";
import ClipboardIcon from "./assets/icons/clipboard.svg";
import useLocalStorage from "./hooks/useLocalStorage";
import "./styles/main.css";
import ListItem from "./components/ListItem";
import AddForm from "./components/AddForm";
import { nanoid } from "nanoid";

const App = () => {
  const [items, setItems] = useLocalStorage("todo-items", []);

  return (
    <main className="w-full h-full flex flex-col items-center">
      <div className="flex items-center mt-8">
        <ClipboardIcon className="mr-3 icon-big" />
        <h1 className="text-4xl font-bold">TO-DO App</h1>
      </div>
      <div className="tasks">
        <AddForm onAdd={addNewItem} />
        {!!items.length && (
          <div className="mt-5">
            {items.map(item => (
              <ListItem
                key={item.id}
                item={item}
                onChecked={changeItemStatus(item)}
                onDelete={deleteItem}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );

  function addNewItem(item) {
    setItems(currentItems => [
      {
        id: nanoid(),
        text: item,
        done: false,
      },
      ...currentItems,
    ]);
  }

  function changeItemStatus({ id, text }) {
    return state => {
      const undoneItems = items.filter(item => !item.done && item.id !== id);
      const doneItems = items.filter(item => item.done && item.id !== id);
      const thisItem = { id, text, done: state };
      if (state) {
        // done
        setItems([...undoneItems, ...doneItems, thisItem]);
      } else {
        // undone
        setItems([...undoneItems, thisItem, ...doneItems]);
      }
    };
  }

  function deleteItem({ id }) {
    setItems(items => items.filter(item => item.id !== id));
  }
};

export default hot(App);
