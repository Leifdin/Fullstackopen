```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
  activate server
  server->>browser: Server sends html file
  deactivate server 

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server->>browser: Server sends stylesheet requested by browser
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
  activate server
  server->>browser: Server sends javascript file to browser
  deactivate server
  note right of browser: Browser requests javascript file and executes it

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server->>browser: sends data for javascrip in json file
  deactivate server
  note right of browser: Browser request json file with data, so that it can render notes list using javascript

  browser->>server: GET https://studies.cs.helsinki.fi/favicon.ico
  activate server
  server->>browser: Server sends icon file for browser to render
  deactivate server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
  activate server
  server->>browser: Server responds with 201: Created
  deactivate server
  note right of browser: browser doesn't refresh page as this behaviour is prevented by javascript, <br>instead redrawNotes() is called
