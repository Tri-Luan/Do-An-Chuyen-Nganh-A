import { BrowserRouter } from "react-router-dom";
import Main from "./components/MainComponent.jsx";

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';
const store = ConfigureStore();

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
