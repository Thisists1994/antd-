import Mock from 'mockjs';

const mockGoodsList = Mock.mock({
  'data|80-200': [
    {
      'id|+1': 1,
      createdAt: '@datetime',
      updatedAt: '@datetime',
      status: '@natural(1, 2)',
      label: '@cname',
      subLabel: '成都市区包邮，其余地区均不发货',
      coverURL:
        'http://xldf-shop.oss-cn-shenzhen.aliyuncs.com/AFnFFmsXetx2b7GQQMByJYQJ5Gc8WPNa.jpg',
      unit: '箱',
      price: '@natural(1, 200)',
      originalPrice: '@natural(1, 200)',
      remainCount: '@natural(1, 200)',
      saleCount: '@natural(1, 200)',
      originalSaleCount: '@natural(1, 200)',
      amount: 3,
      duration: 86400,
      weight: 0,
      visitors: '@natural(1, 20000)',
      browse:'@natural(1, 20000)',
      payment:'@natural(1, 20000)',
      conversion:'@natural(1, 100)%',
      PaymentGoods:'@natural(1, 20000)',
    },
  ],
});

const GoodsDataSource = mockGoodsList.data;

export function fakeListGoods(req, res) {
  let dataSource = [...GoodsDataSource];

  const { query } = req;
  let { page } = query;

  const pageSize = 10;
  page = page || 1;
  const total = dataSource.length;

  // 控制翻页
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  dataSource = dataSource.slice(start, end);

  res.json({
    goodsArr: dataSource,
    pagination: {
      total,
      pageSize,
      current: parseInt(page, 10),
    },
    resultCode: 'OK',
    resultMsg: '',
  });
}

export function fakeOnlineGoods(req, res) {
  res.json({
    resultCode: 'OK',
    resultMsg: '',
  });
}

export function fakeOfflineGoods(req, res) {
  res.json({
    resultCode: 'OK',
    resultMsg: '',
  });
}

export function fakeDeleteGoods(req, res) {
  res.json({
    resultCode: 'OK',
    resultMsg: '',
  });
}

export default {
  fakeListGoods,
  fakeOnlineGoods,
  fakeOfflineGoods,
  fakeDeleteGoods,
};
