"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ValidationErrors {
  email: string;
  password: string[];
}

interface PasswordValidation {
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  hasMinLength: boolean;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({
    email: "",
    password: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (pwd: string): PasswordValidation => {
    return {
      hasUpperCase: /[A-Z]/.test(pwd),
      hasLowerCase: /[a-z]/.test(pwd),
      hasNumber: /\d/.test(pwd),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
      hasMinLength: pwd.length > 8,
    };
  };

  const isPasswordValid = (validation: PasswordValidation): boolean => {
    return Object.values(validation).every(Boolean);
  };

  const getPasswordErrors = (validation: PasswordValidation): string[] => {
    const errors = [];
    if (!validation.hasMinLength)
      errors.push("Password must be more than 8 characters");
    if (!validation.hasUpperCase)
      errors.push("Password must contain at least one uppercase letter (A-Z)");
    if (!validation.hasLowerCase)
      errors.push("Password must contain at least one lowercase letter (a-z)");
    if (!validation.hasNumber)
      errors.push("Password must contain at least one number (0-9)");
    if (!validation.hasSpecialChar)
      errors.push("Password must contain at least one special character");
    return errors;
  };

  const passwordValidation = validatePassword(password);
  const isFormValid =
    validateEmail(email) && isPasswordValid(passwordValidation);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    // Clear email error when user starts typing
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
    // Validate email format in real-time (after user has typed something)
    if (emailValue.length > 0 && !validateEmail(emailValue)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    // Clear password error when user starts typing
    if (errors.password.length > 0) {
      setErrors((prev) => ({ ...prev, password: [] }));
    }
    // Show validation hints when user starts typing
    if (pwd.length > 0 && !showPasswordValidation) {
      setShowPasswordValidation(true);
    } else if (pwd.length === 0) {
      setShowPasswordValidation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let hasErrors = false;
    const newErrors: ValidationErrors = { email: "", password: [] };

    // Validate email
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      hasErrors = true;
    }

    // Validate password
    if (!isPasswordValid(passwordValidation)) {
      newErrors.password = getPasswordErrors(passwordValidation);
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Implement your login logic here
      console.log("Login attempt with:", { email, password });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // If login is successful, redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      setErrors((prev) => ({
        ...prev,
        password: ["Login failed. Please check your credentials."],
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const ValidationItem = ({
    isValid,
    text,
  }: {
    isValid: boolean;
    text: string;
  }) => (
    <div
      className={`flex items-center space-x-2 ${
        isValid ? "text-green-600" : "text-red-600"
      }`}
    >
      <span className="font-mono text-sm">{isValid ? "✓" : "✗"}</span>
      <span className="text-sm">{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password.length > 0 && (
              <div className="mt-2 space-y-1">
                {errors.password.map((error, index) => (
                  <p key={index} className="text-sm text-red-600">
                    • {error}
                  </p>
                ))}
              </div>
            )}
            {showPasswordValidation && errors.password.length === 0 && (
              <div className="mt-3 p-3 border border-gray-200 rounded-md bg-gray-50">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Password Requirements:
                </p>
                <div className="space-y-1">
                  <ValidationItem
                    isValid={passwordValidation.hasMinLength}
                    text="More than 8 characters"
                  />
                  <ValidationItem
                    isValid={passwordValidation.hasUpperCase}
                    text="At least one uppercase letter (A-Z)"
                  />
                  <ValidationItem
                    isValid={passwordValidation.hasLowerCase}
                    text="At least one lowercase letter (a-z)"
                  />
                  <ValidationItem
                    isValid={passwordValidation.hasNumber}
                    text="At least one number (0-9)"
                  />
                  <ValidationItem
                    isValid={passwordValidation.hasSpecialChar}
                    text="At least one special character"
                  />
                </div>
                {isPasswordValid(passwordValidation) && (
                  <div className="mt-2 p-2 bg-green-100 rounded">
                    <p className="text-sm text-green-800 font-medium">
                      ✓ Password meets all requirements!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="text-xs text-gray-500 bg-gray-100 p-3 rounded">
            The validation checks for: ✓ More than 8 characters ✓ At least one
            uppercase letter (A-Z) ✓ At least one lowercase letter (a-z) ✓ At
            least one number (0-9) ✓ At least one special character
          </div>
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
          {/* Forgot Password Link */}
          <button
            type="button"
            onClick={() => console.log("Forgot password clicked")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Forgot your password?
          </button>
        </form>
      </div>
    </div>
  );
}
