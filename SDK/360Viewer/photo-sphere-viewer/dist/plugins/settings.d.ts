import { Event } from 'uevent';
import { AbstractPlugin, Viewer } from 'photo-sphere-viewer';

/**
 * @summary Description of a setting
 */
type BaseSetting = {
  id: string;
  label: string;
  badge?: () => string;
};

/**
 * @summary Description of a 'options' setting
 */
type OptionsSetting = BaseSetting & {
  type: 'options';
  current: () => string;
  options: () => SettingOption[]
  apply: (string) => void;
};

/**
 * @summary Description of a 'toggle' setting
 */
type ToggleSetting = BaseSetting & {
  type: 'toggle';
  active: () => boolean;
  toggle: () => void;
};

/**
 * @summary Option of an 'option' setting
 */
type SettingOption = {
  id: string;
  label: string;
};

type Setting = OptionsSetting | ToggleSetting;

declare const EVENTS: {
  SETTING_CHANGED: 'setting-changed',
};

/**
 * @summary Adds a button to access various settings.
 */
declare class SettingsPlugin extends AbstractPlugin {

  static EVENTS: typeof EVENTS;

  constructor(psv: Viewer);

  /**
   * @summary Registers a new setting
   */
  addSetting(setting: Setting);

  /**
   * @summary Removes a setting
   * @param {string} id
   */
  removeSetting(id: string);

  /**
   * @summary Toggles the settings panel
   */
  toggleSettings();

  /**
   * @summary Hides the settings panel
   */
  hideSettings();

  /**
   * @summary Shows the settings panel
   */
  showSettings();

  /**
   * @summary Triggered when a setting is changed
   */
  on(e: 'setting-changed', cb: (e: Event, settingId: string, value: any) => void): this;

}

export { BaseSetting, EVENTS, OptionsSetting, Setting, SettingOption, SettingsPlugin, ToggleSetting };
