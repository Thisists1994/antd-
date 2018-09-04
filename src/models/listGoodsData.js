import { listGoodsData, listGoodsWeekData, listGoodsMonthData } from '../services/api';

export default {
  namespace: 'listGoodsData',

  state: {
    date: '',
    dateArr: [],
    goodsSummart: {},
    goodsSummaryEcharts: [],
    resultCode: '',
    resultMsg: '',
  },

  effects: {
    *getDay({ payload }, { call, put }) {
      const response = yield call(listGoodsData, payload);
      if (response.resultCode && response.resultCode === 'OK') {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },

    *getWeek({ payload }, { call, put }) {
      const response = yield call(listGoodsWeekData, payload);
      if (response.resultCode && response.resultCode === 'OK') {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },

    *getMonth({ payload }, { call, put }) {
      const response = yield call(listGoodsMonthData, payload);
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
        goodsSummart: {},
        goodsSummaryEcharts: [],
        resultCode: '',
        resultMsg: '',
      };
    },
  },
};
