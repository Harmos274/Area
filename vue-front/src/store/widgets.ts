import { VueConstructor } from 'vue'
import Profile from '@/components/widgets/reddit/Profile.vue'
import ProfileConfig from '@/components/widgets/reddit/ProfileConfig.vue'
import Hots from '@/components/widgets/reddit/Hots.vue'
import HotsConfig from '@/components/widgets/reddit/HotsConfig.vue'

export type WidgetName = 'reddit_profile' | 'reddit_hots'

export interface WidgetConfig {
  name?: string;
  number?: number;
  refresh?: number;
}

export interface Widget {
  id: number;
  type: {
    name: WidgetName;
    configurable: boolean;
  };
  config: WidgetConfig;
}

export interface WidgetConstructor {
  constructor: VueConstructor;
  config: WidgetConfig;
  id: number;
}

const widgets = {
  reddit_profile: { constructor: Profile, configurable: false, configWidget: ProfileConfig },
  reddit_hots: { constructor: Hots, configurable: true, configWidget: HotsConfig },
}

export function getWidgetConstructor (widget: Widget): WidgetConstructor | undefined {
  const constructor = widgets[widget.type.name].constructor

  if (constructor !== undefined) {
    return { constructor, config: widget.config, id: widget.id }
  } else {
    return undefined
  }
}

export function getWidget (id: number, name: WidgetName, config: WidgetConfig): Widget {
  return { id, type: { name, configurable: widgets[name].configurable }, config }
}
