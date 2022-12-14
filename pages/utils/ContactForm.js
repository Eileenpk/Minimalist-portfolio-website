import { useForm, ValidationError } from "@formspree/react";
export default function ContactForm() {
  const [state, handleSubmit] = useForm("meqwjjjn");
  if (state.succeeded) {
    return (
      <h2 className="mb-6 subheading">
        Thanks for reaching out, we'll get back to you soon!
      </h2>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="contactMeForm flex flex-col lg:w-[635px]"
      aria-label="contact form"
    >
      <label
        htmlFor="name"
        className="mb-2 font-bold text-heading-color"
      >
        Name
      </label>
      <input
        className={`h-12 mb-6 bg-form-input-color indent-4 ${
          state.errors.length > 0
            ? "border border-solid border-error-color mb-1"
            : ""
        }`}
        id="name"
        type="text"
        placeholder="Jane Appleseed"
        name="name"
        aria-label="input name field"
      />
      <ValidationError prefix="name" field="name" errors={state.errors} />
      <div className="mb-6 text-xs text-error-color">
        {state.errors.map((err) => err.message)}
      </div>
      <label htmlFor="email" className="mb-2 font-bold text-heading-color">
        Email Address
      </label>
      <input
        id="email"
        type="email"
        name="email"
        className={`h-12 mb-6 bg-form-input-color indent-4 ${
          state.errors.length > 0
            ? "border border-solid border-error-color mb-1"
            : ""
        }`}
        placeholder="email@example.com"
        aria-label="input email field"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <div className="mb-6 text-xs text-error-color">
        {state.errors.map((err) => err.message)}
      </div>

      <label
        htmlFor="message"
        aria-label="message"
        className="mb-2 font-bold text-heading-color"
      ></label>
      <textarea
        id="message"
        name="message"
        className={`h-16 mb-6 bg-form-input-color indent-4 ${
          state.errors.length > 0
            ? "border border-solid border-error-color mb-1"
            : ""
        }`}
        placeholder="How can I help?"
        aria-label="input message field"
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <div className="mb-6 text-xs text-error-color">
        {state.errors.map((err) => err.message)}
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="mb-20 btn bg-btn-color text-main-color"
        aria-label="submit button"
      >
        SEND MESSAGE
      </button>
    </form>
  );
}
