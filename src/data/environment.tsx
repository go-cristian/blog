const GITHUB_LOCAL = {
  id: "315e4e77f5e99f181616",
  secret: "4e9e0f180c31ec2e08f8b6bbb273c009d5d53ccd"
};

const GITHUB_PRODUCTION = {
  id: "fb60535dac0bced1e8f5",
  secret: "88232f5d90c4a2dd537c8cfb2da6213bdaf0fd3e"
};

export const getEnv = () => {
  let env = GITHUB_LOCAL;
  if (process.env.NODE_ENV === "production") {
    env = GITHUB_PRODUCTION;
  }
  return env;
};
