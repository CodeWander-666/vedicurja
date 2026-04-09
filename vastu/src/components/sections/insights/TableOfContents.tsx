interface TableOfContentsProps {
  slug: string;
}

export function TableOfContents({ slug }: TableOfContentsProps) {
  return <div>Table of Contents: {slug}</div>;
}
