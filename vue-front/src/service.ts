import { WidgetCreator } from '@/store'

export interface ServiceDescription {
  headerSrcLight: string;
  headerSrcDark: string;
  brandColor: string;
  authUrlMethod: () => URL;
  unLink: () => void;
  widgets: Array<WidgetCreator>;
}

export type Service = 'reddit' | 'spotify'
