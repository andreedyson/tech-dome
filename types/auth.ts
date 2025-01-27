export type LoginActionResult = {
  errors: {
    email?: string[];
    password?: string[];
  };
  message?: string;
};

export type LogoutActionResult = {
  error: string;
};
