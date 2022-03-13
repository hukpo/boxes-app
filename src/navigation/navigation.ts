import { singleton } from 'tsyringe';
import { createRef, RefObject } from 'react';
import { hide } from 'react-native-bootsplash';
import analytics from '@react-native-firebase/analytics';
import { NavigationContainerRef, StackActions } from '@react-navigation/native';

import { logger } from '@/helpers';
import { STACKS } from './constants';

@singleton()
export class Navigation {
  private _isNavigationReadyRef = createRef<boolean>();
  private _routeNameRef = createRef<string | undefined>();
  private _navigationRef = createRef<NavigationContainerRef<Record<string, object>>>();

  private readonly _NAVIGATION_NOT_READY_RETRY_DELAY = 500;

  get ref(): RefObject<NavigationContainerRef<Record<string, object>>> {
    logger.info('[Navigation] Trying to get ref');

    return this._navigationRef;
  }

  private prepareNavigation = (action: () => void): void => {
    setTimeout(action, this._NAVIGATION_NOT_READY_RETRY_DELAY);
  };

  private getRouteName = (): string | undefined => {
    return this._navigationRef.current?.getCurrentRoute()?.name;
  };

  canGoBack = (): boolean => {
    try {
      if (!this._navigationRef.current) {
        return false;
      }

      return this._navigationRef.current?.canGoBack();
    } catch {
      return false;
    }
  };

  push = (screenName: string, params: object = {}): void => {
    logger.info(`[Navigation] Pushing to ${screenName} screen`);

    try {
      const pushAction = StackActions.push(screenName, params);

      this._navigationRef.current?.dispatch(pushAction);
    } catch {
      this.prepareNavigation(() => this.push(screenName, params));
    }
  };

  popToTop = (): void => {
    logger.info('[Navigation] Popping to top');

    try {
      this._navigationRef.current?.dispatch(StackActions.popToTop());
    } catch {
      this.prepareNavigation(this.popToTop);
    }
  };

  navigate = (screenName: string, params: object = {}): void => {
    logger.info(`[Navigation] Moving to ${screenName} screen`);

    try {
      if (this._isNavigationReadyRef.current && this._navigationRef.current) {
        for (const stackDefinition in STACKS) {
          const stack = STACKS[stackDefinition as keyof typeof STACKS];

          if ('screens' in stack) {
            if ((stack.screens as string[]).includes(screenName)) {
              return this._navigationRef.current?.navigate(stack.name, {
                screen: screenName,
                params,
              });
            }
          }
        }

        return this._navigationRef.current?.navigate(screenName, params);
      } else {
        this.onReady();

        this.prepareNavigation(() => this.navigate(screenName, params));
      }
    } catch {
      this.prepareNavigation(() => this.navigate(screenName, params));
    }
  };

  goBack = (): void => {
    logger.info('[Navigation] Moving to prev screen');

    if (this._isNavigationReadyRef.current && this._navigationRef.current) {
      this._navigationRef.current?.goBack();
    } else {
      logger.error(new Error("Navigation isn't ready"));

      this.prepareNavigation(() => this.goBack());
    }
  };

  onStateChange = (): void => {
    const previousRouteName = this._routeNameRef.current;
    const currentRouteName = this.getRouteName();

    if (previousRouteName !== currentRouteName) {
      analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    }

    this._routeNameRef = { current: currentRouteName };
  };

  onReady = (): void => {
    // TODO ANDROID
    hide({ fade: true });
    this.setIsReady(true);
    this._routeNameRef = { current: this.getRouteName() };
  };

  setIsReady = (isReady: boolean): void => {
    logger.info(`[Navigation] Trying to set is isReady: ${isReady}`);

    this._isNavigationReadyRef = { current: isReady };
  };
}
