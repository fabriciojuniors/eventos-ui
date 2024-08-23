import { ToastContainer } from "react-toastify";
import InstituicoesList from "./components/instituicoes/instituicoes.list";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <>
      <InstituicoesList />
      <ToastContainer />
    </>
  );
}
