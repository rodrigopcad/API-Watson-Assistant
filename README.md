# Api Watson Assistant

Api desenvolvida em Node.js v14.14.0.

Servidor express + nodemon.

Iniciar o servidor com o comando:

```bash
$ npx nodemon
```

Na aplicação cliente (TypeScript), criar a classe para realizar as chamadas a API.

```typescript
export class BotService {
  private sessionid = "";
  private api = "http://localhost:8000";
  private endpoint = {
    session: "/startsession",
    askTheBot: "/askthebot",
  };

  constructor() {
    this.startSession().then(sessionId => (this.sessionid = sessionId || ""));
  }

  private async startSession(): Promise<string | void> {
    const response = await fetch(this.api + this.endpoint.session, {
      method: "GET",
    })
      .then(res => res.text())
      .then(text => text)
      .catch(err => console.error(err));

    return response;
  }

  public async askTheBot(text: string): Promise<string | void> {
    const data = {
      sessionId: this.sessionid,
      text,
    };
    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const response = await fetch(this.api + this.endpoint.askTheBot, {
      headers,
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .catch(err => console.error(err));

    return response.data;
  }
}
```
