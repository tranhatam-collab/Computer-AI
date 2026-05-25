export function ComputerIaiOneGoldenLogo({ className = "", variant = "primary-dark" }) {
  const src = {
    "primary-dark": "/brand-assets/logo/svg/computer-iai-one-golden-logo-primary-dark.svg",
    "primary-light": "/brand-assets/logo/svg/computer-iai-one-golden-logo-primary-light.svg",
    "vertical-dark": "/brand-assets/logo/svg/computer-iai-one-golden-logo-vertical-dark.svg",
    "icon-dark": "/brand-assets/logo/svg/computer-iai-one-golden-icon-dark.svg",
    "icon-transparent": "/brand-assets/logo/svg/computer-iai-one-golden-icon-transparent.svg"
  }[variant] || "/brand-assets/logo/svg/computer-iai-one-golden-logo-primary-dark.svg";
  return <img className={className} src={src} alt="Computer.iai.one" loading="eager" decoding="async" />;
}
