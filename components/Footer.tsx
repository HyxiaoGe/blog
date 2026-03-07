export function Footer() {
  return (
    <footer
      className="border-t py-8"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="max-w-[720px] mx-auto px-5">
        <p
          className="text-sm"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          &copy; {new Date().getFullYear()} Sean. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
