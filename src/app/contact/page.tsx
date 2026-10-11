export const metadata = { title: "Contact the editorial desk" };
export const dynamic = "force-dynamic";
export default function Page() {
  const email = process.env.CONTACT_EMAIL;
  return (
    <article className="wrap policy-page">
      <p className="kicker">THE COURT BRIEF</p>
      <h1>Contact the editorial desk</h1>
      {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? (
        <p>
          For corrections, source documents or editorial inquiries, email{" "}
          <a href={"mailto:" + email}>{email}</a>. Please include the article
          URL and the relevant source passage.
        </p>
      ) : (
        <p>
          The public contact address has not yet been configured. The publisher
          must add a monitored editorial email address before public launch.
        </p>
      )}
      <p>
        For an existing legal matter, contact a qualified legal professional.
        This publication does not offer legal representation.
      </p>
    </article>
  );
}
