const profile = {
  adminID: 1,
  active: true,
  nickname: '超级管理员',
  userName: 'root',
  password: '',
  description: '超级管理员',
  createTime: '2018-06-12T17:16:32+08:00',
  updateTime: '2018-06-12T17:16:32+08:00',
};

export function fakeLogin(req, res) {
  res.json({
    profile,
    resultCode: 'OK',
    resultMsg: '',
  });
}

export function fakeLogout(req, res) {
  res.json({
    resultCode: 'OK',
    resultMsg: '',
  });
}

export function fakeCurrentUser(req, res) {
  res.json({
    profile,
    resultCode: 'OK',
    resultMsg: '',
  });
}

export default {
  fakeLogin,
  fakeLogout,
  fakeCurrentUser,
};
