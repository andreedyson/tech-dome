export type LoginActionResult = {
  errors: {
    email?: string[];
    password?: string[];
  };
  message?: string;
};
