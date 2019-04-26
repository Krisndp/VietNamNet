import {watchGetNews} from './AllNewsSaga';
import {watchGetInfoNews} from './watchGetInfoNews';
import {fork} from 'redux-saga/effects';

export default function* saga(){
    yield fork(watchGetNews);
    yield fork(watchGetInfoNews);
}