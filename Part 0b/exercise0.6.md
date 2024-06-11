```mermaid
SequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
  activate server
  server->>browser: Server responds with 201: Created
  deactivate server
  note right of browser: browser doesn't refresh page as this behaviour is prevented by javascript, <br>instead redrawNotes() is called
```
