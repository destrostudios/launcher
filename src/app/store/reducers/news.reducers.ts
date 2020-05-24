import {Action} from 'rxjs/internal/scheduler/Action';

import {createReducer, on} from '@ngrx/store';

import * as NewsActions from '../actions/news.actions';
import {NewsState} from '../state/news-state.model';

const initialState: NewsState = {
  latestNews: null,
};

const reducer = createReducer(
  initialState,
  on(NewsActions.loadLatestNews, state => ({
    ...state,
    latestNews: {
      isLoading: true,
      data: null,
      error: null
    }
  })),
  on(NewsActions.loadLatestNewsSuccessful, (state, { news }) => ({
    ...state,
    latestNews: {
      isLoading: false,
      data: news,
      error: null
    }
  })),
  on(NewsActions.loadLatestNewsError, (state, { error }) => ({
    ...state,
    latestNews: {
      isLoading: false,
      data: null,
      error
    }
  })),
);

// @ts-ignore
export function newsReducer(state: NewsState | undefined, action: Action) {
  return reducer(state, action);
}
