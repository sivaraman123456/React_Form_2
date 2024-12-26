import { useActionState } from "react";
import {
  isEmail,
  isEqualToOtherValue,
  isNotEmpty,
  hasMinLength,
} from "../util/validation";
function singupAction(prevData, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");
  const firstName = formData.get("first-name");
  const lastName = formData.get("last-name");
  const role = formData.get("role");
  const terms = formData.get("terms");
  const acquisition = formData.getAll("acquisition");

  const error = [];
  if (!isEmail(email)) {
    error.push("Enter the valid email");
  }
  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    error.push("You must provide a password with at least 6 character");
  }
  if (!isEqualToOtherValue(password, confirmPassword)) {
    error.push("The password don't match");
  }
  if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
    error.push("Please provide your first and last name");
  }
  if (!isNotEmpty(role)) {
    error.push("Enter the role");
  }
  if (!terms) {
    error.push("select the terms and conditions");
  }
  if (acquisition.length === 0) {
    error.push("Please enter the at least one acquisition");
  }

  if (error.length > 0) {
    return {
      error,
      enteredValue: {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        role,
        terms,
        acquisition,
      },
    };
  }
  return { error: null };
}
export default function Signup() {
  const [formState, formAction] = useActionState(singupAction, { error: null });
  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          defaultValue={formState.enteredValue?.email}
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={formState.enteredValue?.password}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValue?.confirmPassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            defaultValue={formState.enteredValue?.firstName}
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            defaultValue={formState.enteredValue?.lastName}
          />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select
          id="role"
          name="role"
          defaultValue={formState.enteredValue?.role}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredValue?.acquisition.includes(
              "google"
            )}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValue?.acquisition.includes(
              "friend"
            )}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="other"
            name="acquisition"
            value="other"
            defaultChecked={formState.enteredValue?.acquisition.includes(
              "other"
            )}
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>
      {formState.error && (
        <ul className="error">
          {formState.error.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      )}
      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
