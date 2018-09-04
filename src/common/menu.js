import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '销售分析',
    icon: 'line-chart',
    path: 'sales',
    children: [
      {
        name: '销售概况',
        path: 'survey',
      },
      {
        name: '付款金额分析',
        path: 'payTotalFeeMoney',
      },
      {
        name: '付款订单数分析',
        path: 'payOrderCount',
        authority: 'guest',
      },
    ],
  },
  {
    name: '产品分析',
    icon: 'line-chart',
    path: 'project',
    authority: 'guest',
    children: [
      {
        name: '产品概况',
        path: 'survey',
      },
      {
        name: '页面监控',
        path: 'monitor',
      },
    ],
  },
  {
    name: '商品分析',
    icon: 'line-chart',
    path: 'commodity',
    children: [
      {
        name: '商品概况',
        path: 'survey',
      },
      {
        name: '商品效果分析',
        path: 'goodsEffect',
      },
    ],
  },
  {
    name: '使用行为',
    icon: 'line-chart',
    path: 'behaviour',
    children: [
      {
        name: '页面分析',
        path: 'survey',
      },
    ],
  },
  {
    name: '商品管理',
    icon: 'dashboard',
    path: 'goods',
    authority: 'guest',
    children: [
      {
        name: '商品列表',
        path: 'list',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
