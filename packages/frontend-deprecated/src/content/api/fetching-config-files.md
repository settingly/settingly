# Fetch Configuration Files

This guide demonstrates how to fetch your configuration files from Settingly. Configuration files are used to share data between your microservices.

## Authentication

All requests to the Settingly API require authentication. You'll need to include your API Tokens in the request headers. You can create API Tokens in the Settings of each of your projects.

```sh
-H "X-Settingly-Token: <YOUR_API_TOKEN>"
```

Please make sure the token has the responsibility `Files`.

## Usage

### Base URL

All API requests should be made to the following base URL:

```
https://settingly.xyz
```

### Fetch Configuration Files

To fetch your configuration files, make a GET request to the following endpoint:

```
/api/public/projects/{projectId}/files/{fileName}
```

<br />
The following code shows an example using the JavaScript library ofetch:

```js
import { ofetch } from 'ofetch';

ofetch('https://settingly.xyz/api/v1/public/projects/{projectId}/files/{fileName}');
```

You can find the `projectId` and `fileName` in the Settingly dashboard. The `projectId` is the unique identifier for your project, and the `fileName` is the name of the configuration file you want to fetch.

### Example Response

An example response might look like this:

```json
{
  "currentVersion": {
    "collectionId": "pbc_1102639678",
    "collectionName": "file_versions",
    "content": {
      "hello": "leo"
    },
    "created": "2025-04-21 12:38:46.463Z",
    "file": "h9lgut6q1qk2596",
    "id": "ovf444t2h883g62",
    "updated": "2025-04-21 12:38:46.463Z"
  },
  "file": {
    "collectionId": "pbc_3446931122",
    "collectionName": "files",
    "created": "2025-04-21 12:38:41.073Z",
    "description": "abcde",
    "id": "h9lgut6q1qk2596",
    "name": "my-file",
    "project": "0tx15o41jg3t9e6",
    "updated": "2025-04-21 12:38:41.073Z"
  },
  "fileVersions": [
    {
      "collectionId": "pbc_1102639678",
      "collectionName": "file_versions",
      "content": {
        "hello": "world"
      },
      "created": "2025-04-21 12:38:41.077Z",
      "file": "h9lgut6q1qk2596",
      "id": "z3l86omq4858w7n",
      "updated": "2025-04-21 12:38:41.077Z"
    },
    {
      "collectionId": "pbc_1102639678",
      "collectionName": "file_versions",
      "content": {
        "hello": "leo"
      },
      "created": "2025-04-21 12:38:46.463Z",
      "file": "h9lgut6q1qk2596",
      "id": "ovf444t2h883g62",
      "updated": "2025-04-21 12:38:46.463Z"
    }
  ]
}
```
