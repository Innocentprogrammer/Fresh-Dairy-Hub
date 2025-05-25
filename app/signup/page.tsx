import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const validatePassword = (pwd) => {
    return {
      hasUpperCase: /[A-Z]/.test(pwd),
      hasLowerCase: /[a-z]/.test(pwd),
      hasNumber: /\d/.test(pwd),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
      hasMinLength: pwd.length > 8,
    };
  };

  const passwordValidation = validatePassword(password);
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);

    // Show validation hints when user starts typing
    if (pwd.length > 0 && !showValidation) {
      setShowValidation(true);
    } else if (pwd.length === 0) {
      setShowValidation(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if password meets all requirements
    if (!isPasswordValid) {
      alert("Please ensure your password meets all requirements");
      return;
    }

    // Simulate signup logic
    console.log("Signup attempt with:", { name, email, password });
    alert("Signup successful! (This is just a demo)");
  };

  const ValidationItem = ({ isValid, text }) => (
    <div
      className={`flex items-center text-sm ${
        isValid ? "text-green-600" : "text-red-500"
      }`}
    >
      <span className="mr-2 font-bold">{isValid ? "✓" : "✗"}</span>
      {text}
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Sign Up
      </h1>
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Enter your full name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Enter your email address"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              password && !isPasswordValid
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
            required
            placeholder="Enter your password"
          />

          {showValidation && (
            <div className="mt-3 p-4 bg-gray-50 rounded-md border">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Password Requirements:
              </p>
              <div className="space-y-2">
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
                  text="At least one special character (!@#$%^&*)"
                />
              </div>

              {isPasswordValid && (
                <div className="mt-3 p-2 bg-green-100 rounded-md">
                  <p className="text-green-700 text-sm font-medium">
                    ✓ Password meets all requirements!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <p>
            The validation checks for: <br />✓ More than 8 characters <br />✓ At
            least one uppercase letter (A-Z) <br />✓ At least one lowercase
            letter (a-z) <br />✓ At least one number (0-9) <br />✓ At least one
            special character
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className={`w-full py-3 px-4 rounded-md font-medium transition duration-300 ${
            isPasswordValid && name && email
              ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
          }`}
          disabled={!isPasswordValid || !name || !email}
        >
          {isPasswordValid && name && email
            ? "Sign Up"
            : "Complete all requirements to sign up"}
        </button>
      </div>

      {/* Demo section */}
      <div className="mt-8 p-4 bg-blue-50 rounded-md">
        <h3 className="font-medium text-blue-800 mb-2">Try these examples:</h3>
        <p className="text-blue-700 text-sm">
          Valid password:{" "}
          <code className="bg-white px-1 rounded">MyPass123!</code>
        </p>
        <p className="text-blue-700 text-sm mt-1">
          Invalid password:{" "}
          <code className="bg-white px-1 rounded">password</code> (missing
          requirements)
        </p>
      </div>
    </div>
  );
}
