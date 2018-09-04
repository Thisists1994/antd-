import { listGoods } from '../services/api';

export default {
  namespace: 'goodsList',

  state: {
    goods: [],
    pagination: undefined,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(listGoods, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    // 刷新列表
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    // 修改指定商品的状态
    changeGoodsStatus(state, { payload }) {
      const { goodsArr } = state;
      const { id, status } = payload;

      // 遍历商品列表，将指定id的商品，状态改为传入参数
      const updateGoodsArr = goodsArr.map(obj => {
        return obj.id === id
          ? {
              ...obj,
              status,
            }
          : obj;
      });
      return {
        ...state,
        goodsArr: updateGoodsArr,
      };
    },

    // 删除列表中的指定商品
    afterDelete(state, { payload }) {
      const { goodsArr } = state;
      const { id } = payload;

      // 遍历商品列表，将指定id的商品去掉
      const updateGoodsArr = goodsArr.filter(obj => {
        return obj.id !== id;
      });
      return {
        ...state,
        goodsArr: updateGoodsArr,
      };
    },
  },
};
