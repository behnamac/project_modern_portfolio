import { useState } from "react";
import { PROFILE } from "@/constants";
import Screen from "../../ios/Screen";
import NavBar from "../../ios/NavBar";
import ListGroup from "../../ios/ListGroup";

const FIELD =
  "w-full bg-transparent px-4 py-[11px] text-ios-body text-ios-label outline-none placeholder:text-ios-placeholder";

// Same mailto handoff as the desktop Contacts app, as an iOS compose screen.
const MessageFormScreen = ({ back, tabs, bottomInset }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=Portfolio%20contact&body=${body}`;
  };

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <Screen
      nav={<NavBar title="New Message" back={back} />}
      tabs={tabs}
      bottomInset={bottomInset}
    >
      <form onSubmit={handleSubmit}>
        <ListGroup header="From">
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={set("name")}
            className={FIELD}
          />
          <span className="pointer-events-none block h-px bg-ios-separator" style={{ marginLeft: 16 }} />
          <input
            required
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={set("email")}
            className={FIELD}
          />
        </ListGroup>

        <ListGroup header="Message">
          <textarea
            required
            rows={6}
            placeholder="What's on your mind?"
            value={form.message}
            onChange={set("message")}
            className={`${FIELD} resize-none`}
          />
        </ListGroup>

        <div className="px-4 pb-10 pt-5">
          <button
            type="submit"
            className="w-full rounded-ios-field bg-ios-blue py-3 text-ios-headline text-white active:opacity-80"
          >
            Send
          </button>
          <p className="mt-2 text-center text-ios-footnote text-ios-label-2">
            Opens in your mail app.
          </p>
        </div>
      </form>
    </Screen>
  );
};

export default MessageFormScreen;
