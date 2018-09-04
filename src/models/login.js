import { routerRedux } from 'dva/router';
import { login, logout } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '../utils/utils';

export default {
  namespace: 'login',

  state: {
    currentAuthority: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      console.log(response)
      // 如果登录成功，则重置权限，跳转页面
      if (response.resultCode === 'OK') {
        // 将权限写入到localstorage
        yield put({
          type: 'changeLoginStatus',
          payload: {
            currentAuthority: 'admin',
          },
        });

        // 重新加载权限
        reloadAuthorized();

        // 进行页面跳转
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *logout(_, { call, put }) {
      // const response = yield call(logout);

      // 如果注销成功，则重置权限，跳转到登录页面
      // if (response.resultCode === 'OK') {
        // 将权限写入到localstorage
        yield put({
          type: 'changeLoginStatus',
          payload: {
            currentAuthority: 'guest',
          },
        });

        // 重新加载权限
        reloadAuthorized();

        // 进行页面跳转
        yield put(
          routerRedux.push({
            pathname: '/user/login',
          })
        );
      // }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
