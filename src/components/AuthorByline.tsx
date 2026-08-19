/**
 * Author byline shown under article titles.
 * Dates are the real publish/update dates — keep them honest.
 */
export default function AuthorByline({
  published,
  updated,
  readTime,
}: {
  published: string;
  updated?: string;
  readTime?: string;
}) {
  return (
    <div className="author-byline">
      <span className="author-avatar" aria-hidden="true">
        🎭
      </span>
      <span>
        By the <span className="author-name">PlayGuessWho Team</span>
      </span>
      <span aria-hidden="true">·</span>
      <time dateTime={published}>
        {formatDate(published)}
      </time>
      {updated && (
        <>
          <span aria-hidden="true">·</span>
          <span>
            Updated <time dateTime={updated}>{formatDate(updated)}</time>
          </span>
        </>
      )}
      {readTime && (
        <>
          <span aria-hidden="true">·</span>
          <span>{readTime}</span>
        </>
      )}
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
