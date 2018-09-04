import { delay } from 'roadhog-api-doc';
import {
  fakeListGoods,
  fakeOnlineGoods,
  fakeOfflineGoods,
  fakeDeleteGoods,
} from './mock/fakeGoods';
import { fakeLogin, fakeLogout, fakeCurrentUser } from './mock/fakeUser';
import { fakeListData, fakeWeekListData, fakeMonthListData } from './mock/fakeList';
import {
  fakePaymentListData,
  fakePaymentWeekListData,
  fakePaymentMonthListData,
} from './mock/fakePaymentList';
import {
  fakeGoodsListData,
  fakeGoodsWeekListData,
  fakeGoodsMonthListData,
  fakeDayGoodsList,
  fakeWeekGoodsList,
  fakeMonthGoodsList,
} from './mock/fakeGoodsList';

import {
  fakeDayGoodsDetailList,
  fakeWeekGoodsDetailList,
  fakeMonthGoodsDetailList,
} from './mock/fakeGoodsDetaiList';

import {
  fakeDayBehaviorList,
  fakeWeekBehaviorList,
  fakeMonthBehaviorList,
} from './mock/fakeBehavior';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 登录
  'POST /api/login': fakeLogin,
  // 注销
  'POST /api/logout': fakeLogout,
  // 获取当前用户
  'GET /api/user/profile': fakeCurrentUser,
  // 列出商品
  'GET /api/admin/goods/list': fakeListGoods,
  // 上架商品
  'PUT /api/admin/goods/online': fakeOnlineGoods,
  // 下架商品
  'PUT /api/admin/goods/offline': fakeOfflineGoods,
  // 删除商品
  'DELETE /api/admin/goods': fakeDeleteGoods,

  // 销售概况-获取日数据
  'GET /api/date/summary': fakeListData,
  // 销售概况-获取周数据
  'GET /api/week/summary': fakeWeekListData,
  // 销售概况-获取月数据
  'GET /api/month/summary': fakeMonthListData,

  // 付款金额分析-获取日数据
  'GET /api/date/payment': fakePaymentListData,
  // 付款金额分析-获取周数据
  'GET /api/week/payment': fakePaymentWeekListData,
  // 付款金额分析-获取月数据
  'GET /api/month/payment': fakePaymentMonthListData,

  // 商品概况-获取日数据
  'GET /api/date/goods': fakeGoodsListData,
  // 商品概况-获取周数据
  'GET /api/week/goods': fakeGoodsWeekListData,
  // 商品概况-获取月数据
  'GET /api/month/goods': fakeGoodsMonthListData,

  // 商品效果分析-获取日数据
  'GET /api/date/goods/list': fakeDayGoodsList,
  // 商品效果分析-获取周数据
  'GET /api/week/goods/list': fakeWeekGoodsList,
  // 商品效果分析-获取月数据
  'GET /api/month/goods/list': fakeMonthGoodsList,
  // 商品流量详情-获取日数据
  'GET /api/date/goods/list/detail': fakeDayGoodsDetailList,
  // 商品流量详情-获取周数据
  'GET /api/week/goods/list/detail': fakeWeekGoodsDetailList,
  // 商品流量详情-获取月数据
  'GET /api/month/goods/list/detail': fakeMonthGoodsDetailList,

  // 使用行为-页面分析-获取日数据
  'GET /api/date/behavior': fakeDayBehaviorList,
  // 使用行为-页面分析-获取日数据
  'GET /api/week/behavior': fakeWeekBehaviorList,
  // 使用行为-页面分析-获取日数据
  'GET /api/month/behavior': fakeMonthBehaviorList,
};

export default (noProxy ? {} : delay(proxy, 300));
