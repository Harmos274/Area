import Vue, { VueConstructor } from 'vue'
import Profile from '@/components/widgets/reddit/Profile.vue'
import ProfileConfig from '@/components/widgets/reddit/ProfileConfig.vue'

export type WidgetName = 'reddit_profile'

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
  constructor: VueConstructor<Vue>;
  config: WidgetConfig;
  id: number;
}

const widgets = {
  reddit_profile: { constructor: Profile, configurable: false, configWidget: ProfileConfig },
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
