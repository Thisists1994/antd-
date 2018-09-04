import { listDayGoodsData, listWeekGoodsData, listMonthGoodsData } from '../services/api';

export default {
  namespace: 'goodsEffect',
  state: {
    date: '',
    week: undefined,
    year: undefined,
    month: '',
    goodsDetails: [],
    pagination: {},
    platform: '',
    product: 0,
    search: '',
    resultCode: 'OK',
    resultMsg: '',
  },
  effects: {
    *getDay({ payload }, { call, put }) {
      const response = yield call(listDayGoodsData, payload);
      if (response.resultCode && response.resultCode === 'OK') {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },

    *getWeek({ payload }, { call, put }) {
      const response = yield call(listWeekGoodsData, payload);
      if (response.resultCode && response.resultCode === 'OK') {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },

    *getMonth({ payload }, { call, put }) {
      const response = yield call(listMonthGoodsData, payload);
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
        week: undefined,
        year: undefined,
        month: '',
        goodsDetails: [],
        pagination: {},
        platform: '',
        product: 0,
        search: '',
        resultCode: 'OK',
        resultMsg: '',
      };
    },
  },
};
