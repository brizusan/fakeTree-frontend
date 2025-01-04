export type User = {
  name: string;
  email: string;
  nickname: string;
  description: string;
  avatar: string;
  _id: string;
  links: string;
};

export type UserNickname = Omit<User,  "email" | "_id">;

export type UserProfile = Pick<User, "nickname" | "description">;

export type RegisterForm = Pick<User, "name" | "email" | "nickname"> & {
  password: string;
  password_confirmation: string;
};

export type LoginForm = Pick<User, "email"> & {
  password: string;
};

export type SocialNetwork = {
  id: number;
  name: string;
  url: string;
  enabled: boolean;
};

export type LinkTreeLinks = Pick<SocialNetwork, "name" | "url" | "enabled">;
