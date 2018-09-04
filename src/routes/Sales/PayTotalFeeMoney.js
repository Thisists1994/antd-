import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ReactEcharts from 'echarts-for-react';
import { Card, Tabs, DatePicker, Select, Row, Col, Form, Table } from 'antd';
const FormItem = Form.Item;
const { MonthPicker, WeekPicker } = DatePicker;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
@Form.create()
@connect(({ listPaymentData }) => ({
  listPaymentData,
}))
export default class PayTotalFeeMoney extends Component {
  state = {
    date: moment().add(-1, 'days'),
    weekDate: moment().add(-1, 'week'),
    monthDate: moment().add(-1, 'month'),
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listPaymentData/getDay',
    });
  }

  // Tabs选择器
  callback = key => {
    const { dispatch } = this.props;
    switch (key) {
      case 'day':
        dispatch({
          type: 'listPaymentData/getDay',
        });
        break;
      case 'week':
        dispatch({
          type: 'listPaymentData/getWeek',
        });
        break;
      case 'month':
        dispatch({
          type: 'listPaymentData/getMonth',
        });
        break;
    }
  };

  // 日期选择器
  onChange(_, date, type) {
    let week = undefined;
    let year = undefined;
    let month = undefined;
    const { dispatch } = this.props;
    console.log(type);
    console.log(date);
    switch (type) {
      case 'day':
        dispatch({
          type: 'listPaymentData/getDay',
          payload: {
            date,
          },
        });
        break;
      case 'week':
        let WeekArr = date.substring(0, 7).split('-');
        year = WeekArr[0];
        week = WeekArr[1];
        dispatch({
          type: 'listPaymentData/getWeek',
          payload: {
            year,
            week,
          },
        });
        break;
      case 'month':
        month = date;
        dispatch({
          type: 'listPaymentData/getMonth',
          payload: {
            month,
          },
        });
        break;
    }
  }
  // 下拉选择器
  handleChange(value) {
    console.log(`selected ${value}`);
  }
  // 转换新数组
  convertKey(arr, key) {
    let newArr = [];
    arr.forEach((item, index) => {
      let newObj = {};
      newObj[key[0]] = item[Object.keys(item)[0]];
      newObj[key[1]] =
        item[Object.keys(item)[1]] + '\t\t(' + (item[Object.keys(item)[2]] * 100).toFixed(2) + '%)';
      newObj[key[2]] =
        item[Object.keys(item)[3]] + '\t\t(' + (item[Object.keys(item)[4]] * 100).toFixed(2) + '%)';
      newObj[key[3]] =
        item[Object.keys(item)[5]] + '\t\t(' + (item[Object.keys(item)[6]] * 100).toFixed(2) + '%)';
      newObj[key[4]] = item[Object.keys(item)[7]];
      newArr.push(newObj);
    });
    return newArr;
  }
  convertKey2(obj, key) {
    // let newArr = [];
    let newObj = {};
    newObj[key[0]] = '总计';
    newObj[key[1]] =
      obj[Object.keys(obj)[0]] + '\t\t(' + (obj[Object.keys(obj)[1]] * 100).toFixed(2) + '%)';
    newObj[key[2]] =
      obj[Object.keys(obj)[2]] + '\t\t(' + (obj[Object.keys(obj)[3]] * 100).toFixed(2) + '%)';
    newObj[key[3]] =
      obj[Object.keys(obj)[4]] + '\t\t(' + (obj[Object.keys(obj)[5]] * 100).toFixed(2) + '%)';
    newObj[key[4]] = obj[Object.keys(obj)[6]];
    return newObj;
  }

  render() {
    const { date, weekDate, monthDate } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { listPaymentData } = this.props;

    const appMoneyArr = []; // APP付款金额
    const weChatMoneyArr = []; // 公众号付款金额
    const appletMoneyArr = []; // 小程序付款金额
    if (typeof listPaymentData != 'undefined') {
      for (let i = 0; i < listPaymentData.paymentEcharts.length; i++) {
        appMoneyArr.push(listPaymentData.paymentEcharts[i].appMoney);
        weChatMoneyArr.push(listPaymentData.paymentEcharts[i].weChatMoney);
        appletMoneyArr.push(listPaymentData.paymentEcharts[i].appletMoney);
      }
    }
    const option = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        data: ['APP', '公众号', '小程序'],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: listPaymentData.dateArr,
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'APP',
          type: 'line',
          areaStyle: { normal: {} },
          data: appMoneyArr,
        },
        {
          name: '公众号',
          type: 'line',
          areaStyle: { normal: {} },
          data: weChatMoneyArr,
        },
        {
          name: '小程序',
          type: 'line',
          areaStyle: { normal: {} },
          data: appletMoneyArr,
        },
      ],
    };
    const columns = [
      {
        title: '日期/时间',
        dataIndex: 'eventDate',
      },
      {
        title: 'APP（占比）',
        dataIndex: 'app',
      },
      {
        title: '公众号（占比）',
        dataIndex: 'wechat',
      },
      {
        title: '小程序（占比）',
        dataIndex: 'applet',
      },
      {
        title: '合计',
        dataIndex: 'dateMoney',
      },
    ];
    let dataSource = this.convertKey(listPaymentData.paymentEcharts, [
      'eventDate',
      'app',
      'wechat',
      'applet',
      'dateMoney',
    ]);
    let totalTabel = this.convertKey2(listPaymentData.totalTabel, [
      'eventDate',
      'app',
      'wechat',
      'applet',
      'dateMoney',
    ]);
    dataSource.push(totalTabel);
    for (let i = 0; i < dataSource.length; i++) {
      dataSource[i].key = i;
    }
    return (
      <PageHeaderLayout title="付款金额分析">
        <Card>
          <Form layout="inline">
            <Tabs onSubmit={this.handleSearch} onChange={this.callback} type="card">
              <TabPane tab="日数据" key="day">
                <Row>
                  <Col md={8} sm={24}>
                    <FormItem label="选择日期">
                      {getFieldDecorator('date', {
                        rules: [
                          {
                            required: true,
                            message: '请选择日期',
                          },
                        ],
                        initialValue: date,
                      })(
                        <DatePicker
                          onChange={(date, dateString) => this.onChange(date, dateString, 'day')}
                        />
                      )}
                    </FormItem>
                  </Col>
                  {/* <Col md={8} sm={24}>
                    <FormItem label="选择类型">
                      {getFieldDecorator('type', {
                        rules: [
                          {
                            required: true,
                            message: '请选择类型',
                          },
                        ],
                        initialValue: '全平台',
                      })(
                        <Select style={{ width: 120 }} onChange={this.handleChange}>
                          <Option value="全平台">全平台</Option>
                          <Option value="幸福场">幸福场</Option>
                          <Option value="幸福到家">幸福到家</Option>
                          <Option value="拼团购">拼团购</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col> */}
                </Row>
              </TabPane>
              <TabPane tab="周数据" key="week">
                <Row>
                  <Col md={8} sm={24}>
                    <FormItem label="选择日期">
                      {getFieldDecorator('weekDate', {
                        rules: [
                          {
                            required: true,
                            message: '请选择日期',
                          },
                        ],
                        initialValue: weekDate,
                      })(
                        <WeekPicker
                          onChange={(date, dateString) => this.onChange(date, dateString, 'week')}
                        />
                      )}
                    </FormItem>
                  </Col>
                  {/* <Col md={8} sm={24}>
                    <FormItem label="选择类型">
                      {getFieldDecorator('type', {
                        rules: [
                          {
                            required: true,
                            message: '请选择类型',
                          },
                        ],
                        initialValue: '全平台',
                      })(
                        <Select style={{ width: 120 }} onChange={this.handleChange}>
                          <Option value="全平台">全平台</Option>
                          <Option value="幸福场">幸福场</Option>
                          <Option value="幸福到家">幸福到家</Option>
                          <Option value="拼团购">拼团购</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col> */}
                </Row>
              </TabPane>
              <TabPane tab="月数据" key="month">
                <Row>
                  <Col md={8} sm={24}>
                    <FormItem label="选择日期">
                      {getFieldDecorator('monthDate', {
                        rules: [
                          {
                            required: true,
                            message: '请选择日期',
                          },
                        ],
                        initialValue: monthDate,
                      })(
                        <MonthPicker
                          onChange={(date, dateString) => this.onChange(date, dateString, 'month')}
                        />
                      )}
                    </FormItem>
                  </Col>
                  {/* <Col md={8} sm={24}>
                    <FormItem label="选择类型">
                      {getFieldDecorator('type', {
                        rules: [
                          {
                            required: true,
                            message: '请选择类型',
                          },
                        ],
                        initialValue: '全平台',
                      })(
                        <Select style={{ width: 120 }} onChange={this.handleChange}>
                          <Option value="全平台">全平台</Option>
                          <Option value="幸福场">幸福场</Option>
                          <Option value="幸福到家">幸福到家</Option>
                          <Option value="拼团购">拼团购</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col> */}
                </Row>
              </TabPane>
            </Tabs>
          </Form>
        </Card>
        <Card title="付款金额堆叠区域图" style={{ marginTop: 32 }}>
          <ReactEcharts option={option} style={{ height: 500 }} />
        </Card>
        <Card title="付款金额明细" style={{ marginTop: 32 }}>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
        </Card>
      </PageHeaderLayout>
    );
  }
}
