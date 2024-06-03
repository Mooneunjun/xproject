// 필요한 모듈 및 컴포넌트를 임포트합니다.
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { createReview, getReviews, updateReview, deleteReview } from "../api";
import { useEffect, useState } from "react";

// 한 페이지당 로드할 리뷰의 개수를 상수로 정의합니다.
const LIMIT = 6;

// App 컴포넌트의 메인 함수입니다.
function App() {
  // 정렬 순서, 리뷰 아이템 목록, 현재 오프셋, 다음 페이지 존재 여부를 state로 관리합니다.
  const [order, setOrder] = useState("createdAt");
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  // 리뷰 아이템을 정렬 순서에 따라 정렬합니다.
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  // 최신순 정렬 버튼 클릭 핸들러입니다.
  const handleNewestClick = () => setOrder("createdAt");
  // 베스트순 정렬 버튼 클릭 핸들러입니다.
  const handleBestClick = () => setOrder("rating");

  // 리뷰 삭제 핸들러입니다. id를 받아 해당 리뷰를 목록에서 제거합니다.
  const handleDelete = async (id) => {
    const result = await deleteReview(id);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 리뷰를 로드하는 비동기 함수입니다. 정렬 순서, 오프셋, 제한을 옵션으로 받습니다.
  const handleLoad = async (options) => {
    let result;
    try {
      setLoadingError(null);
      setIsLoading(true);
      result = await getReviews(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const { reviews, paging } = result;
    // 첫 페이지 로드 시에는 아이템 목록을 대체하고, 그 외에는 아이템 목록에 추가합니다.
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    // 오프셋을 업데이트하고, 다음 페이지 존재 여부를 설정합니다.
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  // 더 보기 버튼 클릭 핸들러입니다. 현재 상태에 기반하여 리뷰를 추가로 로드합니다.
  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  // 컴포넌트 마운트 및 정렬 순서 변경 시 리뷰를 로드합니다.
  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  // UI를 렌더링합니다. 정렬 버튼, 리뷰 목록, 더 보기 버튼을 포함합니다.
  return (
    <div className="App">
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>

      <ReviewForm
        onSubmit={createReview}
        onSubmitSuccess={handleCreateSuccess}
      />
      <ReviewList
        items={sortedItems}
        onDelete={handleDelete}
        onUpdate={updateReview}
        onUpdateSuccess={handleUpdateSuccess}
      />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

// App 컴포넌트를 export합니다.
export default App;
