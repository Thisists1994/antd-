import React, { Component } from 'react';
import { connect } from 'dva';
import { Alert } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const { Tab, Password, Mobile, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  handleSubmit = (err, values) => {
    const { dispatch } = this.props;
    if (!err) {
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
        },
      });
    }
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  render() {
    const { login, submitting } = this.props;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey="mobile"
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <Tab key="mobile" tab="手机号密码登录">
            {login.resultCode === 'FAIL' && !submitting && this.renderMessage(login.resultMsg)}
            <Mobile name="mobile" />
            <Password name="password" />
          </Tab>
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}
