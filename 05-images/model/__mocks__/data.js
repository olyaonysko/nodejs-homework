const contacts = [
  {
    _id: "604748de9e5626d740485ba1",
    subscription: "premium",
    name: "John",
    email: "john@gmail.com",
    phone: "(142)235-1298",
    owner: "60474a4aa399a1d05095632a",
  },
  {
    _id: "604749c79e5626d740485ba7",
    subscription: "pro",
    name: "Lina",
    email: "lina@gmail.com",
    phone: "(142)235-2110",
    owner: "60474a4aa399a1d050956321",
  },
];

const newContact = {
  name: "Teddy",
  email: "teddy@gmail.com",
  phone: "(142)235-2112",
  subscription: "pro",
};

const User = {
  _id: "604780b0a33f593b5866d70d",
  subscription: "pro",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDc4MGIwYTMzZjU5M2I1ODY2ZDcwZCIsImlhdCI6MTYxNTMzNDc0NCwiZXhwIjoxNjE1MzM4MzQ0fQ.ZOul5xw2qGjRiFVXE4eKyIcJJ3ubRsVcmlXSm-KzNzg",
  email: "test007@gmail.com",
  password: "$2a$08$ebkI0zFk0IBoStiDDhyzr.9y0BqToGXPtrcTqcMErEuk4JHHF3K8O",
  avatarURL: "1616266653843-example",
};

const users = [];
users[0] = User;

const newUser = { email: "test@gmail.com", password: "1234567" };

module.exports = { contacts, newContact, User, users, newUser };
