import settings from "../../img/icons/settings.svg";
export const iconMap = {
    settings: settings,
  } as const;
  
  export type IconName = keyof typeof iconMap;