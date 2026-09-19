import { useState } from "react";
import { PROFILE } from "@/constants";
import { GithubGlyph, LinkedinGlyph } from "@/components/icons";

const QUICK_LINKS = [
  {
    label: "Schedule a call",
    color: "bg-[#ff5f57] hover:bg-[#ff4a41]",
    href: `mailto:${PROFILE.email}?subject=Let's%20talk`,
  },
  {
    label: "Email me",
    color: "bg-[#28c840] hover:bg-[#20ad35]",
    href: `mailto:${PROFILE.email}`,
  },
  {
    label: "GitHub",
    color: "bg-[#333] hover:bg-[#222]",
    href: PROFILE.github,
    Icon: GithubGlyph,
  },
  {
    label: "LinkedIn",
    color: "bg-[#0a66c2] hover:bg-[#08529b]",
    href: PROFILE.linkedin,
    Icon: LinkedinGlyph,
  },
];

const ContactsApp = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=Portfolio%20contact%20form&body=${body}`;
  };

  return (
    <div className="mac-scroll h-full overflow-auto p-6 text-sm">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-blue-600 text-xl font-bold text-white">
        {PROFILE.initials}
      </div>
      <h2 className="mb-1 text-lg font-bold">Let&rsquo;s Connect</h2>
      <p className="mb-5 text-black/60 dark:text-white/60">
        Got an idea? A bug to squash? Or just wanna talk tech? I&rsquo;m in.
      </p>

      <div className="mb-6 grid grid-cols-2 gap-2">
        {QUICK_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className={`flex flex-col items-center gap-1.5 rounded-lg px-3 py-3 text-center text-xs font-semibold text-white transition ${l.color}`}
          >
            {l.Icon && <l.Icon className="h-4 w-4" />}
            {l.label}
          </a>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-2 border-t border-black/10 pt-4 dark:border-white/10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/40 dark:text-white/40">
          Or send a message directly
        </p>
        <input
          required
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-md border border-black/10 bg-white/60 px-3 py-2 text-sm outline-none focus:border-blue-400 dark:border-white/10 dark:bg-white/5"
        />
        <input
          required
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-md border border-black/10 bg-white/60 px-3 py-2 text-sm outline-none focus:border-blue-400 dark:border-white/10 dark:bg-white/5"
        />
        <textarea
          required
          rows={4}
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-md border border-black/10 bg-white/60 px-3 py-2 text-sm outline-none focus:border-blue-400 dark:border-white/10 dark:bg-white/5"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-2 text-sm font-semibold text-white hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactsApp;
