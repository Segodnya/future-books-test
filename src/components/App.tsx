import { Provider } from "react-redux";
import store from "../redux/store";
import BookSearch from "./BookSearch";
import { HashRouter, Route, Routes } from "react-router-dom";
import BookDetails from "./BookDetails";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<BookSearch />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
};

export default App;
