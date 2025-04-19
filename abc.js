// const projectId = "your_project_id";
// const fileName = "your_file_name";
// const settinglyToken = "your_settingly_token";

// const response = await fetch(
//   `http://localhost:3000/api/v1/public/projects/${projectId}/files/${fileName}`,
//   {
//     method: "GET",
//     headers: {
//       "X-Settingly-Token": settinglyToken,
//     },
//   }
// );

// const file = await response.json();

const projectId = "6803cc62718bdecf070ff934";
const fileName = "hello-world-file";
const settinglyToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6WyJvcmc6ZmlsZXM6cmVhZCJdLCJwcm9qZWN0SWQiOiI2ODAzY2M2MjcxOGJkZWNmMDcwZmY5MzQiLCJuYW1lIjoiYWJjIiwiaWF0IjoxNzQ1MDc5NDUxLCJleHAiOjE3NTI4NTU0NTF9.XygZTm77qbKjETYINMBZbtO9_gLbcTP4CB6LSyHjUcw";

const response = await fetch(
  `http://localhost:3000/api/v1/public/projects/${projectId}/files/${fileName}`,
  {
    method: "GET",
    headers: {
      "X-Settingly-Token": settinglyToken,
    },
  }
);

const file = await response.json();

console.log(file);
