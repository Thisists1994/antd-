import { queryCurrentAdmin } from '../services/api';

export default {
  namespace: 'user',

  state: {
    profile: undefined,
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrentAdmin);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
