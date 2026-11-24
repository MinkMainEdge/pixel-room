import rawContent from "@/data/content.json";

export type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: string;
};

export type Video = {
  id: string;
  src?: string;
  youtubeId?: string;
  caption: string;
  poster?: string;
};

export type MusicTrack = {
  id: string;
  title: string;
};

export type Content = {
  meta: {
    title: string;
    tagline: string;
  };
  senderEmail: string;
  music: MusicTrack[];
  letter: {
    recipientName: string;
    body: string[];
    senderName: string;
  };
  photos: Photo[];
  videos: Video[];
  benchMessage: string;
};

export const content = rawContent as Content;

export default content;
