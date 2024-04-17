import React, { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";

function ReviewForm() {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
  });

  const handleChange = (name, value) => {
    if (name === "rating" && (value < 0 || value > 5)) {
      return;
    }
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <input
        name="title"
        type="text"
        placeholder="title"
        value={values.title}
        onChange={handleInputChange}
      />
      <input
        name="rating"
        type="number"
        placeholder="Rating"
        value={values.rating}
        onChange={handleInputChange}
      />

      <input
        name="content"
        type="text"
        placeholder="Content"
        value={values.content}
        onChange={handleInputChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default ReviewForm;
