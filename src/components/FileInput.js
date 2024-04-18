import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    if (!nextValue) {
      return;
    }

    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div>
      {preview && (
        <img src={preview} alt="이미지 미리보기" className="previewImg" />
      )}
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />

      {value && (
        <button type="button" onClick={handleClearClick}>
          X
        </button>
      )}

      <style jsx>{`
        .previewImg {
          max-width: 200px;
          max-height: 200px;
        }
      `}</style>
    </div>
  );
}

export default FileInput;
