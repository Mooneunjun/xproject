import ReviewList from "./ReviewList";
import { useState } from "react";
import { getReviews } from "./api";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("");
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const hanleBestClick = () => setOrder("rating");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoadClick = async () => {
    const { reviews } = await getReviews();
    setItems(reviews);
  };

  return (
    <div className="App">
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={hanleBestClick}>베스트순</button>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      <button onClick={handleLoadClick}>불러오기</button>
    </div>
  );
}

export default App;
