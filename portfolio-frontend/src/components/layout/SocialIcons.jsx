import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";

const socials = [
  { Icon: FaGithub, href: "https://github.com/tarunkumarsingh179", label: "GitHub" },
  { Icon: FaLinkedinIn, href: "https://linkedin.com/in/tarunkumarsingh179", label: "LinkedIn" },
  { Icon: FaXTwitter, href: "https://twitter.com/tarunkumarsingh179", label: "Twitter" },
  { Icon: FaInstagram, href: "https://instagram.com/tarunkumarsingh179", label: "Instagram" },
];

const SocialIcons = () => {
  return (
    <div className="fixed left-6 bottom-0 z-50 hidden xl:flex flex-col items-center gap-5">
      {socials.map(({ Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-textSecondary hover:text-accent transition-all duration-300 hover:-translate-y-1 text-lg"
        >
          <Icon />
        </a>
      ))}
      <div className="mt-2 w-px h-20 bg-gradient-to-b from-textSecondary/50 to-transparent" />
    </div>
  );
};

export default SocialIcons;
