type User = {
  id: number;
  username: string;
  role: "member" | "contributor" | "admin";
};

// type UpdatedUser = {
//   id?: number;
//   username?: string;
//   role?: "member" | "contributor" | "admin";
// };
type UpdatedUser = Partial<User>;

const users: User[] = [
  { id: 1, username: "john_doe", role: "member" },
  { id: 2, username: "jane_doe", role: "contributor" },
  { id: 3, username: "josh_doe", role: "admin" },
  { id: 4, username: "rose_doe", role: "member" },
];

function updateUser(id: number, updates: UpdatedUser) {
  /*

            Challenge:
            Find the user in the array by the id.
            Use Object.assign to update the found user in place.
            Check MDN if you need help with using Object.assign
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        
    */
  const user = users.find((user) => user.id === id);
  if (user === undefined) {
    console.error("User not found!");
    return;
  }
  Object.assign(user, updates);
}

updateUser(1, { username: "new_john_doe" });
updateUser(4, { role: "contributor" });

console.log(users);
