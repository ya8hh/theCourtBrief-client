export const metadata = { title: "Privacy policy" };
export default function Page() {
  return (
    <article className="wrap policy-page">
      <p className="kicker">THE COURT BRIEF</p>
      <h1>Privacy policy</h1>
      <p>
        Starter policy — professional review required before public launch.
        Public reading does not require an account. The application does not
        include advertising trackers or reader analytics in Phase 1.
      </p>
      <p>
        Infrastructure providers may process request logs, including IP
        addresses. Editors’ account details and authentication information are
        processed by Strapi. The publisher must specify the data controller,
        retention periods, processor details and privacy contact before launch.
      </p>
    </article>
  );
}
