import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
