import { toast } from "react-toastify";

const ws = new WebSocket('ws://localhost:8080/encerra-evento-ws');

export default function initEncerraEventosWs() {
    ws.addEventListener('open', () => {
        console.log('Connected to server');      
      });
      
      ws.addEventListener('message', (ev) => {
        const result = JSON.parse(ev.data);
        
        toast(<div><strong>{result.titulo}</strong><br/>{result.mensagem}</div>, {
            theme: "dark",
            type: "info"
        })
      });
      
      ws.addEventListener('close', () => {
        console.log('Disconnected from server');
      });
}