import { Post, User } from "./types";

export const dummyUsers: User[] = [
  {
    id: "u1",
    username: "john_doe",
    name: "John Doe",
    image: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    bio: "Software developer and coffee enthusiast.",
  },
  {
    id: "u2",
    username: "jane_smith",
    name: "Jane Smith",
    image: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    bio: "Lover of books and nature.",
  },
  {
    id: "u3",
    username: "alex_wong",
    name: "Alex Wong",
     image: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    bio: "Tech geek exploring the world of AI.",
  },
];

export const dummyPosts: Post[] = [
  {
    id: "p1",
    createdAt: "2025-07-22T10:00:00Z",
    content: "Just finished a great coding session! #TypeScript",
    userId: "u1",
    user: dummyUsers[0],
    parentId: null,
    parent: null,
    replies: [
      {
        id: "p2",
        createdAt: "2025-07-22T10:15:00Z",
        content: "Nice! What project are you working on? 😄",
        userId: "u2",
        user: dummyUsers[1],
        parentId: "p1",
        parent: null, // Avoid circular reference
        replies: [],
      },
    ],
  },
  {
    id: "p3",
    createdAt: "2025-07-22T11:00:00Z",
    content: "Exploring new AI models today. Any recommendations?",
    userId: "u3",
    user: dummyUsers[2],
    parentId: null,
    parent: null,
    replies: [
      {
        id: "p4",
        createdAt: "2025-07-22T11:30:00Z",
        content: "Check out the latest from xAI! #AI",
        userId: "u1",
        user: dummyUsers[0],
        parentId: "p3",
        parent: null, // Avoid circular reference
        replies: [],
      },
    ],
  },
];