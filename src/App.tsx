import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import styled from "styled-components";

const ListPage = lazy(() => import("./pages/list"));

function App() {
  return (
    <AppContainer className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;