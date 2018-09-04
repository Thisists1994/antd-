import { DayGoodsDetailList, WeekGoodsDetailList, MonthGoodsDetailList } from '../services/api';

export default {
  namespace: 'goodsDetailList',
  state: {
    date: undefined,
    dateArr: undefined,
    goodsDetailEcharts: undefined,
    goodsDetailTotalTabel: undefined,
    resultCode: undefined,
    resultMsg: undefined,
    searchType: undefined,
    week: undefined,
    year: undefined,
    month: undefined,
  },
  effects: {
    *getDay({ payload }, { call, put }) {
      const response = yield call(DayGoodsDetailList, payload);
      if (response.resultCode && response.resultCode === 'OK') {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },

    *getWeek({ payload }, { call, put }) {
      const response = yield call(WeekGoodsDetailList, payload);
      if (response.resultCode && response.resultCode === 'OK') {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },

    *getMonth({ payload }, { call, put }) {
      const response = yield call(MonthGoodsDetailList, payload);
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
        date: undefined,
        dateArr: undefined,
        goodsDetailEcharts: undefined,
        goodsDetailTotalTabel: undefined,
        resultCode: undefined,
        resultMsg: undefined,
        searchType: undefined,
        week: undefined,
        year: undefined,
        month: undefined,
      };
    },
  },
};
