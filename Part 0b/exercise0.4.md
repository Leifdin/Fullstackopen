```mermaid
sequenceDiagram

    participant server
    participant browser

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server ->>browser: HTML document /exampleapp/new_note
    deactivate server

    browser->>server: GET "https://studies.cs.helsinki.fi/exampleappnotes"
    activate server
    server->>browser HTML document /exampleappnotes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser CSS document /exampleapp/main.css
    deactivate server

    browser->>server GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server->>browser JavaScript file /exampleapp/main.js
    deactivate server
    
    Note right of browser: The browser executes main.js and fetches data.json

    browser->>server GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server->>browser JSON data /exampleapp/data.json
    deactivate server

    browser->>server GET https://studies.cs.helsinki.fi/favicon.ico
    activate server
    server->>browser Icon file /favicon.ico
    deactivate server
```
