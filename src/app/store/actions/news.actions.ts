import {createAction, props} from '@ngrx/store';

import {News} from '../../model/news.model';

export const loadLatestNews = createAction('[News] Load latest news');
export const loadLatestNewsSuccessful = createAction('[News] Load latest news successful', props<{ news: News[] }>());
export const loadLatestNewsError = createAction('[News] Load latest news error', props<{ error: any }>());
