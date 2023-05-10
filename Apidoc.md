# GLOBAL ACCESS API DOC

## Endpoints :

List of available endpoints:

- `GET /application`

## 1. GET /application

#### Description

- Check application version

#### Request

- headers:

```json
{
  "id": Uuid,
}
```

#### Response

_200 - Ok_

```json
{
  "access_token": String,
}

```

_Response (400 - Bad Request)_

```json

{
  "message": "Your version outdated, please update!"
}
OR
{
    "message": "Invalid ID"
}

```

&nbsp;
