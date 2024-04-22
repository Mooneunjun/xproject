import React, { useState } from "react";
import { createReview } from "../api";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [SubmittingError, setSubmittingError] = useState(null);
  const [values, setValues] = useState(INITIAL_VALUES);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      await createReview(formData);
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }

    setValues(INITIAL_VALUES);
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
      <RatingInput
        name="rating"
        placeholder="Rating"
        value={values.rating}
        onChange={handleChange}
      />

      <input
        name="content"
        type="text"
        placeholder="Content"
        value={values.content}
        onChange={handleInputChange}
      />

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
      {SubmittingError?.message && <div>{SubmittingError.message}</div>}
    </form>
  );
}

export default ReviewForm;
