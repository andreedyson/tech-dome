export type LoginActionResult = {
  errors: {
    email?: string[];
    password?: string[];
  };
  message?: string;
};

export type ActionResult = {
  error?: string;
  message?: string;
};
