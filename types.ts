export type User = {
  id: string; // Unique identifier for the user (e.g., UUID or database ID)
  username: string; // Unique username (e.g., @john_doe)
  name: string; // Full name or display name
  image?: string; // URL to profile image (optional, as some users may not have one)
  bio?: string; // Short bio or description (optional)

}
export type Post = {
  id: string; // Unique identifier for the post
  createdAt: string | Date; // Timestamp of when the post was created (ISO string or Date object)
  content: string; // The text content of the post
  userId: string; // ID of the user who created the post
  user: User; // The user object (for displaying user info with the post)
  parentId?: string | null; // ID of the parent post (optional, null for top-level posts)
  parent?: Post | null; // Reference to the parent post (optional, for threaded replies)
  replies?: Post[]; // Array of reply posts (optional, for displaying threaded conversations)
}