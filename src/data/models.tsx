export interface Gist {
  id: string;
  date: Date;
  title: string;
  contentUrl: string;
  user: User;
}

export interface GistContent {
  owner: User;
  date: Date;
  title: string;
  content: string;
}

export interface Result {
  user: User;
  posts: Gist[];
}

export class Session {
  token: string;
  user: User;
  constructor(token: string, user: User) {
    this.token = token;
    this.user = user;
  }

  valid: () => boolean = () =>
    this.token != null && this.token !== undefined && this.token.length > 0;
}

export interface User {
  avatarUrl: string;
  name: string;
  nick: string;
}

export interface GistUserSchema {
  name: string;
  login: string;
  avatar_url: string;
}

export interface FileMetadata {
  key: string;
  filename: string;
  raw_url: string;
}

export interface FileGistSchema {
  [key: string]: FileMetadata;
}

export interface GistSchema {
  id: string;
  files: FileGistSchema;
  created_at: string;
}
