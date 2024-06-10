```mermaid
sequenceDiagram

    participant server
    participant browser

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server ->>browser: HTML document /exampleapp/new_note
    deactivate server
