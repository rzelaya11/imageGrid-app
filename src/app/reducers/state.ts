import { RouterState } from 'react-router-redux';
import { ImageState } from 'app/containers/ImagesGrid/reducer/state';

export interface RootState {
  router: RouterState;
  images: ImageState,
}

export interface SortedColumn {
  id: string;
  desc: boolean;
}
