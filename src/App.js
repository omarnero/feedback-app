import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AiconLink from "./components/AiconLink";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import Header from "./components/Header";
import About from "./pages/About";
import Post from "./pages/Post";
import { FeedbackProvider } from "./components/context/FeedbackContext";
const App = () => {
  return (
    <FeedbackProvider>
      <Router>
        <Header text="feedback ui" />
        <div className="container">
          <Routes>
            <Route
              path="/"
              exact
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                  <AiconLink />
                </>
              }
            ></Route>
            <Route path="/about" element={<About />} />
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </div>
      </Router>
    </FeedbackProvider>
  );
};
export default App;
