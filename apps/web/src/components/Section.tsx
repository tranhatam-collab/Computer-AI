import { PropsWithChildren } from "react";

interface SectionProps extends PropsWithChildren {
  id?: string;
  title: string;
  subtitle?: string;
}

export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-head">
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
