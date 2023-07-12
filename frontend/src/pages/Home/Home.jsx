import { useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

function Home() {
  const { use, token } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("/Login");
    }
  });
  return <h1>Home</h1>;
}

export default Home;
