
# Gestão de eventos (front-end)

Projeto destinado a realização de gestão de eventos de uma institução, permitindo o cadastro de instituições e eventos.

## Funcionamento
- Dado que seja realizado o cadastro de uma instituição é habilitado o cadastro de eventos.
- As instituições possuem nome e tipo.
- Os eventos possuem nome, data/hora de início, data/hora de finalização e indicativo se está ativo. Este indicativo é gerido automaticamente pela aplicação.
- Sempre que um evento é encerrado será apresentado uma notificação em tela recebida atravpes do `web socket`.
- Uma vez encerrados, não é possível realizar alterações em eventos.


## Tecnologias

- React 18
- Next 14
- TypeScript
- Tailwind/Flowbite
## Executando localmente

Para instalar as dependências
```bash
  npm install
```


Para fazer o deploy desse projeto rode

```bash
  npm run dev
```

