interface RichTextProps {
  content: string
}

export default function RichText({ content }: RichTextProps) {
  const looksLikeHtml = /<[a-z][\s\S]*>/i.test(content)

  if (looksLikeHtml) {
    return <div className="rich-text" dangerouslySetInnerHTML={{ __html: content }} />
  }

  const paragraphs = content.split(/\n{2,}/).filter((part) => part.trim().length > 0)
  return (
    <div className="rich-text">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}