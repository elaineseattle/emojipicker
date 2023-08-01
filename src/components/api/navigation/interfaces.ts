import { NavigationApiResponse } from './model/navigation-api.response';

export interface NavigationAPI {
  getNavigationApiResponse(): Promise<NavigationApiResponse>;
}
