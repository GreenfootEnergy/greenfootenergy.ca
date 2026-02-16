import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n";

interface LocalizedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  "data-testid"?: string;
  id?: string;
}

export function LocalizedLink({ href, children, className, onClick, "data-testid": testId, id }: LocalizedLinkProps) {
  const { localizedPath } = useLanguage();
  
  return (
    <Link 
      href={localizedPath(href)} 
      className={className}
      onClick={onClick}
      data-testid={testId}
      id={id}
    >
      {children}
    </Link>
  );
}

export function useLocalizedHref() {
  const { localizedPath } = useLanguage();
  return localizedPath;
}
