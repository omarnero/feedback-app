import { useState, useEffect } from "react";
import React from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import { useContext } from "react";
import Context from "./context/FeedbackContext";
const FeedbackForm = (props) => {
  const { add, feedbackEdit, change, update } = useContext(Context);
  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [rating, setRating] = useState(10);
  const [message, setMessage] = useState("");
  const [id, setId] = useState(0);
  useEffect(() => {
    if (change === true) {
      const [feedback] = feedbackEdit;
      const { id, text, rating } = feedback;
      setText(text);
      setRating(rating);
      setId(id);
    }
  }, [feedbackEdit, change]);
  let feedback;
  const textHandler = (e) => {
    if (text.trim().length === "") {
      setDisabled(true);
      setMessage(null);
    } else if (text.trim().length !== "" && text.trim().length < 10) {
      setDisabled(true);
      setMessage("You must have at least ten chars");
    } else {
      setDisabled(false);
      setMessage(null);
    }
    setText(e.target.value);
  };
  const sumbitHandler = (e) => {
    e.preventDefault();
    if (change === true && text.trim().length !== "") {
      feedback = {
        id,
        text,
        rating,
      };
      update(id, feedback);
    } else if (text.trim().length !== "") {
      feedback = {
        id: Math.random() * 1000,
        text,
        rating,
      };
      add(feedback);
    } else {
    }
    setText("");
  };
  return (
    <Card>
      <form onSubmit={sumbitHandler}>
        <h4>you like to rate your service</h4>
        <RatingSelect select={setRating} selected={rating} />
        <div className="input-group">
          <input
            onChange={textHandler}
            type="text"
            placeholder="Write a servece"
            value={text}
          />
          <Button type="sumbit" isDisabled={disabled}>
            Send
          </Button>
        </div>
      </form>
      {message && <div className="message">{message}</div>}
    </Card>
  );
};

export default FeedbackForm;
