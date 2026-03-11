const { z } = require("zod");

/* LOGIN SCHEMA */

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 chars." })
    .max(255, { message: "Email must not be more than 255 character" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least of 6 chars." })
    .max(1024, { message: "Password must not be more than 1024 character" }),
});


/* SIGNUP SCHEMA */

const signUpSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(3, { message: "Name must be at least of 3 chars." })
      .max(255, { message: "Name must not be more than 255 character" }),

    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email({ message: "Invalid email address" }),

    password: z
      .string({ required_error: "Password is required" })
      .trim()
      .min(6, { message: "Password must be at least of 6 chars." }),

    phone: z
      .string({ required_error: "Phone is required" })
      .trim()
      .min(10, { message: "Phone must be at least of 10 characters." })
      .max(15, { message: "Phone must not be more than 15 characters" }),

    role: z
      .enum(["patient", "doctor"], {
        required_error: "Role is required",
      }),

    specialization: z
      .string()
      .trim()
      .optional(),
  })

  /* CONDITIONAL VALIDATION */

  .refine(
    (data) => {
      if (data.role === "doctor") {
        return data.specialization && data.specialization.length > 0;
      }
      return true;
    },
    {
      message: "Specialization is required for doctors",
      path: ["specialization"],
    }
  );

module.exports = {
  signUpSchema,
  loginSchema,
};