import { listData, listWeekData, listMonthData } from '../services/api';

export default {
  namespace: 'listData',

  state: {
    date: '',
    dateArr: [],
    orderSummary: {},
    paySummaryEcharts: [],
    resultCode: '',
    resultMsg: '',
  },

  effects: {
    *getDay({ payload }, { call, put }) {
      const response = yield call(listData, payload);
      if (response.resultCode && response.resultCode === 'OK') {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },

    *getWeek({ payload }, { call, put }) {
      const response = yield call(listWeekData, payload);
      if (response.resultCode && response.resultCode === 'OK') {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },

    *getMonth({ payload }, { call, put }) {
      const response = yield call(listMonthData, payload);
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
        date: '',
        dateArr: [],
        orderSummary: {},
        paySummaryEcharts: [],
        resultCode: '',
        resultMsg: '',
      };
    },
  },
};
