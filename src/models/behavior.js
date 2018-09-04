import { DayBehaviorList, WeekBehaviorList, MonthBehaviorList } from '../services/api';

export default {
  namespace: 'behavior',
  state: {
    behavior: undefined,
    dataArr: undefined,
    date: undefined,
    details: undefined,
    echarts: undefined,
    platform: undefined,
    resultCode: undefined,
    resultMsg: undefined,
    summary: undefined,
    week: undefined,
    year: undefined,
    month: undefined,
  },
  effects: {
    *getDay({ payload }, { call, put }) {
      const response = yield call(DayBehaviorList, payload);
      if (response.resultCode && response.resultCode === 'OK') {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },

    *getWeek({ payload }, { call, put }) {
      const response = yield call(WeekBehaviorList, payload);
      if (response.resultCode && response.resultCode === 'OK') {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },

    *getMonth({ payload }, { call, put }) {
      const response = yield call(MonthBehaviorList, payload);
      if (response.resultCode && response.resultCode === 'OK') {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        behavior: undefined,
        dataArr: undefined,
        date: undefined,
        details: undefined,
        echarts: undefined,
        platform: undefined,
        resultCode: undefined,
        resultMsg: undefined,
        summary: undefined,
        week: undefined,
        year: undefined,
        month: undefined,
      };
    },
  },
};
