import {createFeatureSelector, createSelector} from '@ngrx/store';

import {NewsState} from '../state/news-state.model';

const getNewsState = createFeatureSelector<NewsState>('news');

export const areLatestNewsLoading = createSelector(
  getNewsState, state => state.latestNews ? state.latestNews.isLoading : null
);

export const getLatestNews = createSelector(
  getNewsState, state => state.latestNews ? state.latestNews.data : null
);
