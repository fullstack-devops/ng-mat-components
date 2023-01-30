import { Data, Route } from '@angular/router';

/**
 *  @interface NavFrameConfig
 *
 *  @appName             {string}     displayed app name, shows only in opened mode
 *  @appVersion          {string}     (optional) display app version
 *  @logoSrc             {string}     (optional) link to logo, can be relative or full URL
 */
export interface NavFrameConfig {
  appName: string;
  appVersion?: string;
  logoSrc?: string;
}

export enum FrameEvents {
  MANAGE_ACCOUNT = 'EVENT_MANAGE_ACCOUNT',
  LOGOUT = 'EVENT_LOGOUT',
}

/**
 *  @interface FrameEvent
 *
 *  @type                {string}     eventtype which got fired
 *  @data                {string}     data which get send with event
 */
export interface FrameEvent {
  type: FrameEvents;
  data: any;
}

/**
 *  @interface NavUser
 *
 *  @name                 {string}     displayed name of user
 *  @role                 {string}     displayed role of user (can be empty)
 *  @profilePicture       {string}     profile Picture (can be empty)
 */
export interface NavUser {
  name: string;
  role: string;
  profilePicture: string;
}

interface FrameRouteData extends Data {
  /**
   * sould this route be visable in sidenav
   */
  displaySidemenu: boolean;
  /**
   * displayed text, shows only in opened mode
   */
  sidenavText: string;
  /**
   * displayed icon, use **only** material-icons!
   */
  sidenavIcon: string;
  /**
   * ...
   */
  roles?: string[];
  /**
   * App title dynamic
   */
  title?: string;
}
interface FrameRoute extends Route {
  data?: FrameRouteData;
}
export type FrameRoutes = FrameRoute[];

type StringOfLength<Min, Max> = string & {
  readonly StringOfLength: unique symbol; // this is the phantom type
};

// This is a type guard function which can be used to assert that a string
// is of type StringOfLength<Min,Max>
const isStringOfLength = <Min extends number, Max extends number>(str: string, min: Min, max: Max): str is StringOfLength<Min, Max> =>
  str.length >= min && str.length <= max;

// type constructor function
export const stringOfLength = <Min extends number, Max extends number>(input: unknown, min: Min, max: Max): StringOfLength<Min, Max> => {
  if (typeof input !== 'string') {
    throw new Error('invalid input');
  }

  if (!isStringOfLength(input, min, max)) {
    throw new Error('input is not between specified min and max');
  }

  return input; // the type of input here is now StringOfLength<Min,Max>
};
