import { createContext, useState, useEffect } from "react";
import FeedbackData from "../../data/FeedbackData";
const Context = createContext();
export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);
  const [feedbackEdit, setFeedbackEdit] = useState();
  const [change, setChange] = useState(false);
  const del = (id) => {
    // await fetch(`http://localhost:5000/feedback/${id}`, { method: "DELETE" });
    let index = feedback.findIndex((item) => {
      return item.id === id;
    });
    let dataC = feedback.slice();
    dataC.splice(index, 1);
    setFeedback(dataC);
  };
  const fetchFeedback = () => {
    // const response = await fetch("http://localhost:5000/feedback");
    // const data = await response.json();
    setFeedback(FeedbackData);
    setIsLoading(false);
  };
  const add = (item) => {
    // const response = await fetch("http://localhost:5000/feedback", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(item),
    // });
    // const data = await response.json();
    setFeedback([item, ...feedback]);
  };
  const edit = (id) => {
    const elem = feedback.filter((ele) => {
      return ele.id === id;
    });
    setFeedbackEdit(elem);
    setChange(true);
  };
  const update = (id, item) => {
    // const response = await fetch(`http://localhost:5000/feedback/${id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(item),
    // });
    const data = item;
    const index = feedback.findIndex((ele) => {
      return ele.id === data.id;
    });
    let nfeed = feedback.slice();
    nfeed.splice(index, 1);
    nfeed.splice(index, 0, data);
    setFeedback(nfeed);
  };
  return (
    <Context.Provider
      value={{
        feedback,
        del,
        add,
        edit,
        isLoading,
        feedbackEdit,
        change,
        update,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
