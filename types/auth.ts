export type LoginActionResult = {
  errors: {
    email?: string[];
    password?: string[];
  };
  message?: string;
};

export type RegisterActionResult = {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
};

export type ActionResult = {
  error?: string;
  message?: string;
  redirectUrl?: string;
};
