import { IconType } from 'react-icons';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

export interface Social {
  label: string;
  href: string;
  icon: IconType;
}

export const email = 'mikiyasabate1219@gmail.com';

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/mikias1219', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mikiyas-abate/', icon: FaLinkedin },
  { label: 'Email', href: `mailto:${email}`, icon: FiMail },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100077164533916', icon: FaFacebook },
];
