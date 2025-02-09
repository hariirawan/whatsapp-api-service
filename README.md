# WhatsApp API Service

This is a WhatsApp API service built using [Baileys](https://github.com/WhiskeySockets/Baileys) and [Bun](https://bun.sh/). It enables sending messages and retrieving account information through a REST API.

## Features

- Connect to WhatsApp Web via Baileys
- Retrieve logged-in WhatsApp account details
- Send messages programmatically
- Secure API access with middleware authentication

## Prerequisites

- [Bun](https://bun.sh/) installed
- A valid WhatsApp account

## Installation

Clone this repository and install dependencies:

```sh
bun install
```

## Configuration

Create a `.env` file in the root directory and set the following variables:

```env
PORT=3000
API_KEY=my-secret-api-key
```

## Running the Service

Start the server with:

```sh
bun --watch run src/index.ts
```

## API Endpoints

### 1. Get WhatsApp Account Details

#### Endpoint

```http
GET /account
```

#### Headers

```json
{
  "x-api-key": "API_KEY"
}
```

#### Response

```json
{
  "success": true,
  "user": {
    "id": "123456789@s.whatsapp.net",
    "name": "Your Name"
  }
}
```

### 2. Send a Message

#### Endpoint

```http
POST /send
```

#### Headers

```json
{
  "x-api-key": "API_KEY",
  "Content-Type": "application/json"
}
```

#### Body

```json
{
  "number": "1234567890",
  "message": "Hello from API!"
}
```

#### Response

```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

## Notes

- This service uses WhatsApp Web, which may have limitations and risks of being blocked by WhatsApp.
- Use this for personal or experimental purposes only.
