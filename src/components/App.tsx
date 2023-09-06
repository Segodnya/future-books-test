import { Provider } from "react-redux";
import store from "../redux/store";
import BookSearch from "./BookSearch";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookDetails from "./BookDetails";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookSearch />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
