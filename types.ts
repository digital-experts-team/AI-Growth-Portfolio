
export interface ProjectStory {
  challenge: string;
  process: string;
  solution: string;
  impact: string;
  timeline: string;
  role: string;
  stats: { label: string; value: string }[];
}

export interface ProjectSectionItem {
  title?: string;
  text: string;
  icon?: string;
}

export interface ProjectSection {
  id: string;
  title: string;
  content?: string;
  layout?: 'normal' | 'highlight' | 'grid' | 'process' | 'quote' | 'list';
  items?: ProjectSectionItem[];
  image?: string;
  caption?: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  year: string;
  story: ProjectStory;
  sections?: ProjectSection[];
  client?: string;
  themeColor?: string;
  logo?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isTyping?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export enum SectionId {
  HOME = 'home',
  WORK = 'work',
  ABOUT = 'about',
  EXPERIENCE = 'experience',
  SERVICES = 'services',
  CONTACT = 'contact'
}
