import { onlineGoods, offlineGoods, deleteGoods } from '../services/api';

export default {
  namespace: 'goodsOperation',

  state: {
    resultCode: undefined,
    resultMsg: undefined,
  },

  effects: {
    *online({ payload }, { call, put }) {
      const response = yield call(onlineGoods, payload);
      if (response.resultCode === 'OK') {
        yield put({
          type: 'save',
          payload: response,
        });
        const { id } = payload;
        yield put({
          type: 'goodsList/changeGoodsStatus',
          payload: {
            id,
            status: 1,
          },
        });
      }
    },
    *offline({ payload }, { call, put }) {
      const response = yield call(offlineGoods, payload);
      if (response.resultCode === 'OK') {
        yield put({
          type: 'save',
          payload: response,
        });
        const { id } = payload;
        yield put({
          type: 'goodsList/changeGoodsStatus',
          payload: {
            id,
            status: 2,
          },
        });
      }
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteGoods, payload);
      if (response.resultCode === 'OK') {
        yield put({
          type: 'save',
          payload: response,
        });
        const { id } = payload;
        yield put({
          type: 'goodsList/afterDelete',
          payload: {
            id,
          },
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
  },
};
