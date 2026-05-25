export function ComputerIaiOneLogo({ className = "", variant = "dark" }) {
  const src = variant === "light"
    ? "/brand-assets/logo/computer-iai-one-logo-primary-light.svg"
    : "/brand-assets/logo/computer-iai-one-logo-primary-dark.svg";

  return (
    <img
      className={className}
      src={src}
      alt="Computer.iai.one"
      loading="eager"
      decoding="async"
    />
  );
}

export function ComputerIaiOneIcon({ className = "" }) {
  return (
    <img
      className={className}
      src="/brand-assets/logo/computer-iai-one-icon-dark.svg"
      alt="Computer.iai.one icon"
      loading="eager"
      decoding="async"
    />
  );
}
