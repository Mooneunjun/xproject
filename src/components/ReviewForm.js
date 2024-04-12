import React, { useState } from "react";
import "./ReviewForm.css";

function ReviewForm() {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "rating" && (value < 0 || value > 5)) {
      return;
    }
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="title"
        value={values.title}
        onChange={handleChange}
      />
      <input
        name="rating"
        type="number"
        placeholder="Rating"
        value={values.rating}
        onChange={handleChange}
      />

      <input
        name="content"
        type="text"
        placeholder="Content"
        value={values.content}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default ReviewForm;
