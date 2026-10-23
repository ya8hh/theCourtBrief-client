export const metadata = { title: "Privacy policy" };
export default function Page() {
  return (
    <article className="wrap policy-page">
      <p className="kicker">COURTROOMDIGEST</p>
      <h1>Privacy policy</h1>
      <p>
        Starter policy — professional review required before public launch.
        Public reading does not require an account. When enabled, CourtroomDigest uses
        Google Analytics to understand readership, page views, engagement and clicks
        on court source links. Google Analytics may use cookies and process device,
        browser and referral information. Advertising personalization and Google
        signals are disabled. Our custom events exclude search queries and URL
        query parameters. Browser settings and content blockers may limit collection.
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
