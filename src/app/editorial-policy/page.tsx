export const metadata = { title: "Editorial policy" };
export default function Page() {
  return (
    <article className="wrap policy-page">
      <p className="kicker">THE COURT BRIEF</p>
      <h1>Editorial policy</h1>
      <p>
        Our reporting is grounded in official judgments and orders. Articles
        distinguish the parties’ arguments from the Court’s conclusions, and
        identify procedural limits and uncertainty where relevant.
      </p>
      <p>
        Publication requires human editorial approval. AI-assisted material,
        when used, must be checked against the source before publication.
        Original source links accompany each report; unavailable PDFs are
        identified explicitly.
      </p>
    </article>
  );
}
