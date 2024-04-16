import { useState } from "react";

function FoodForm() {
  const [values, setValues] = useState({
    title: "",
    calorie: 0,
    content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.title.trim() === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    if (values.calorie <= 0) {
      alert("칼로리는 0보다 작을 수 없습니다.");
      return;
    }

    if (values.content.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    console.log(values);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "calorie" && value < 0) {
      return;
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange} />
      <input
        type="number"
        name="calorie"
        value={values.calorie}
        onChange={handleChange}
      />
      <input name="content" value={values.content} onChange={handleChange} />
      <button type="submit">확인</button>
    </form>
  );
}

export default FoodForm;
