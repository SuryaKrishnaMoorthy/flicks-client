import { createRoot } from "react-dom/client";
import Container from "react-bootstrap/Container";
import { MainView } from "./components/mainView/mainView";
import "./index.scss";

const FlicksApp = () => {
  return (
    <Container className="flicks">
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<FlicksApp />);
