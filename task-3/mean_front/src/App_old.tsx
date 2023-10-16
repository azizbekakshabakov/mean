import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);

  const items = [
    "new york",
    "san francisco",
    "tokyo",
    "london",
    "paris",
    "moscow",
  ];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  /*const getMessage = () => {
    return items.length === 0 ?? <p>adf</p>;
  }*/

  return (
    <>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>
          Hello <span>world</span>
        </Alert>
      )}
      <Button color="danger" onClick={() => setAlertVisibility(true)}>
        Button
      </Button>
    </>
  );
}

export default App;
