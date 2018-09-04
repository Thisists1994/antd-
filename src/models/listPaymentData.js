import { listPaymentData, listPaymentWeekData, listPaymentMonthData } from '../services/api';

export default {
  namespace: 'listPaymentData',

  state: {
    date: '',
    dateArr: [],
    paymentEcharts: [],
    resultCode: '',
    resultMsg: '',
    totalTabel: {},
  },

  effects: {
    *getDay({ payload }, { call, put }) {
      const response = yield call(listPaymentData, payload);
      if (response.resultCode && response.resultCode === 'OK') {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },

    *getWeek({ payload }, { call, put }) {
      const response = yield call(listPaymentWeekData, payload);
      if (response.resultCode && response.resultCode === 'OK') {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },

    *getMonth({ payload }, { call, put }) {
      const response = yield call(listPaymentMonthData, payload);
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
        paymentEcharts: [],
        resultCode: '',
        resultMsg: '',
        totalTabel: {},
      };
    },
  },
};
