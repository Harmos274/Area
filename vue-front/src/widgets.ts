import { VueConstructor } from 'vue'
import Profile from '@/components/widgets/reddit/Profile.vue'
import ProfileConfig from '@/components/widgets/reddit/ProfileConfig.vue'
import Hots from '@/components/widgets/reddit/Hots.vue'
import HotsConfig from '@/components/widgets/reddit/HotsConfig.vue'
import SpotlightsConfig from '@/components/widgets/reddit/SpotlightsConfig.vue'
import Spotlights from '@/components/widgets/reddit/Spotlights.vue'
import SpotifyProfile from '@/components/widgets/spotify/Profile.vue'
import SpotifyProfileConfig from '@/components/widgets/spotify/ProfileConfig.vue'
import SpotifyPlayer from '@/components/widgets/spotify/Player.vue'
import SpotifyPlayerConfig from '@/components/widgets/spotify/PlayerConfig.vue'
import SpotifyShowPlayer from '@/components/widgets/spotify/ShowPlayer.vue'
import SpotifyShowPlayerConfig from '@/components/widgets/spotify/ShowPlayerConfig.vue'

export type WidgetName =
  'reddit_profile' | 'reddit_hots' | 'reddit_spotlights' |
  'spotify_profile' | 'spotify_music' | 'spotify_podcast'

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
  reddit_spotlights: { constructor: Spotlights, configurable: false, configWidget: SpotlightsConfig },
  spotify_profile: { constructor: SpotifyProfile, configurable: false, configWidget: SpotifyProfileConfig },
  spotify_music: { constructor: SpotifyPlayer, configurable: true, configWidget: SpotifyPlayerConfig },
  spotify_podcast: { constructor: SpotifyShowPlayer, configurable: true, configWidget: SpotifyShowPlayerConfig },
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
