'use client';

import { ToastContainer } from "react-toastify";
import InstituicoesList from "./components/instituicoes/instituicoes.list";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import initEncerraEventosWs from "@/ws/encerra-eventos.cliente";

export default function Home() {
  useEffect(() => {
    initEncerraEventosWs();
  }, []);
  return (
    <>
      <InstituicoesList />
      <ToastContainer />
    </>
  );
}
