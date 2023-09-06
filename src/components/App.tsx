import { Provider } from "react-redux";
import store from "../redux/store";
import BookSearch from "./BookSearch";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BookSearch />
    </Provider>
  );
};

export default App;
