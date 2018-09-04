import { stringify } from 'qs';
import request from '../utils/request';

// 登录
export async function login(params) {
  return request('/api/login', {
    method: 'POST',
    body: params,
  });
}

// 注销
export async function logout() {
  return request('/api/logout', {
    method: 'POST',
  });
}

// 获取当前用户
export async function queryCurrentAdmin() {
  return request('/api/user/profile');
}

// 列出商品
export async function listGoods(params) {
  return request(`/api/admin/goods/list?${stringify(params)}`);
}

// 上架商品
export async function onlineGoods(params) {
  return request('/api/admin/goods/online', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

// 下架商品
export async function offlineGoods(params) {
  return request('/api/admin/goods/offline', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

// 删除商品
export async function deleteGoods(params) {
  return request('/api/admin/goods', {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}

// 添加商品
export async function addGoods(params) {
  return request('/api/admin/goods', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 销售概况-获取日数据
export async function listData(params) {
  return request(`/api/date/summary?${stringify(params)}`);
}
// 销售概况-获取周数据
export async function listWeekData(params) {
  return request(`/api/week/summary?${stringify(params)}`);
}
// 销售概况-获取月数据
export async function listMonthData(params) {
  return request(`/api/month/summary?${stringify(params)}`);
}
// 付款金额分析-获取日数据
export async function listPaymentData(params) {
  return request(`/api/date/payment?${stringify(params)}`);
}
// 付款金额分析-获取周数据
export async function listPaymentWeekData(params) {
  return request(`/api/week/payment?${stringify(params)}`);
}
// 付款金额分析-获取月数据
export async function listPaymentMonthData(params) {
  return request(`/api/month/payment?${stringify(params)}`);
}

// 商品概况-获取日数据
export async function listGoodsData(params) {
  return request(`/api/date/goods?${stringify(params)}`);
}
// 商品概况-获取周数据
export async function listGoodsWeekData(params) {
  return request(`/api/week/goods?${stringify(params)}`);
}
// 商品概况-获取月数据
export async function listGoodsMonthData(params) {
  return request(`/api/month/goods?${stringify(params)}`);
}

// 商品效果分析-获取日数据
export async function listDayGoodsData(params) {
  return request(`/api/date/goods/list?${stringify(params)}`);
}
// 商品效果分析-获取周数据
export async function listWeekGoodsData(params) {
  return request(`/api/week/goods/list?${stringify(params)}`);
}
// 商品效果分析-获取月数据
export async function listMonthGoodsData(params) {
  return request(`/api/month/goods/list?${stringify(params)}`);
}
// 商品流量详情-获取日数据
export async function DayGoodsDetailList(params) {
  return request(`/api/date/goods/list/detail?${stringify(params)}`);
}
// 商品流量详情-获取周数据
export async function WeekGoodsDetailList(params) {
  return request(`/api/week/goods/list/detail?${stringify(params)}`);
}
// 商品流量详情-获取月数据
export async function MonthGoodsDetailList(params) {
  return request(`/api/month/goods/list/detail?${stringify(params)}`);
}
// 使用行为-页面分析-获取日数据
export async function DayBehaviorList(params) {
  return request(`/api/date/behavior?${stringify(params)}`);
}
// 使用行为-页面分析-获取周数据
export async function WeekBehaviorList(params) {
  return request(`/api/week/behavior?${stringify(params)}`);
}
// 使用行为-页面分析-获取月数据
export async function MonthBehaviorList(params) {
  return request(`/api/month/behavior?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}
