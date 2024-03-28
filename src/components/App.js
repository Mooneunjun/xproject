import ReviewList from "./ReviewList";
import items from "../mock.json";

function App() {
  return (
    <div className="App">
      <ReviewList items={items} />
    </div>
  );
}

export default App;
