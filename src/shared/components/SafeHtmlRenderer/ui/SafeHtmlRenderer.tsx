import DOMPurify from "dompurify";

interface SafeHtmlRendererProps {
  htmlContent: string;
  className?: string;
}

export const SafeHtmlRenderer = ({ htmlContent, className }: SafeHtmlRendererProps) => {
  const cleanHtml = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: ["p", "strong", "em", "a", "ul", "ol", "li"],
    ALLOWED_ATTR: ["href", "title", "class"],
  });

  return <div className={className} dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};
