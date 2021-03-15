import { WidgetCreator } from '@/store'

export interface ServiceDescription {
  headerImageLight: string;
  headerImageDark: string;
  brandColor: string;
  authUrlMethod: () => URL;
  unLink: () => void;
  widgets: Array<WidgetCreator>;
}

export type Service = 'reddit' | 'spotify' | 'github'
