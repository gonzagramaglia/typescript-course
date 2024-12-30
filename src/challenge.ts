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
type UpdatedUser = Partial<User>; // function that returns User with all its properties as optional

let nextUserId = 1;

const users: User[] = [
  { id: nextUserId++, username: "john_doe", role: "member" },
  { id: nextUserId++, username: "jane_doe", role: "contributor" },
  { id: nextUserId++, username: "josh_doe", role: "admin" },
  { id: nextUserId++, username: "rose_doe", role: "member" },
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

function addNewUser(newUser: Omit<User, "id">): User {
  /*

        Challenge:
        Create a new variable called `user`, add an `id` property to it and spread in all the properties of the `newUser` object. Think about how you should set the type for this `user` object.
        Push the new object to the `users` array, and return the object from the function at the end
        
  */
  const user: User = { id: nextUserId++, ...newUser };
  users.push(user);
  return user;
}

// example usage:
addNewUser({ username: "joe_schmoe", role: "member" });

console.log(users);
