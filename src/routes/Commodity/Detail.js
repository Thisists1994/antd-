import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Tabs, DatePicker, Select, Row, Col, Form, Table } from 'antd';
import ReactEcharts from 'echarts-for-react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import DescriptionList from '../../components/DescriptionList';
// const { Description } = DescriptionList;
const FormItem = Form.Item;
const { MonthPicker, WeekPicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;
@Form.create()
@connect(({ goodsDetailList }) => ({
  goodsDetailList,
}))
export default class CommodityDetail extends Component {
  state = {
    date: moment().add(-1, 'days'),
    weekDate: moment().add(-1, 'week'),
    monthDate: moment().add(-1, 'month'),
    key: 'day',
    goodsID: undefined,
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      dispatch,
    } = this.props;
    this.setState({
      goodsID: id === 'undefined' ? '' : id,
    });
    dispatch({
      type: 'goodsDetailList/getDay',
      payload: { goodsID: id },
    });
  }

  // 日期选择器
  onChange(_, date, type) {
    let week = '';
    let year = '';
    let month = '';
    let WeekArr = [];
    const {
      form: { getFieldsValue },
    } = this.props;
    const { goodsID } = this.state;
    const { dispatch } = this.props;
    const formValue = getFieldsValue();
    switch (type) {
      case 'day':
        dispatch({
          type: 'goodsDetailList/getDay',
          payload: {
            date,
            searchType: formValue.DateProduct === '访客数' ? 'VISITUV' : formValue.DateProduct,
            goodsID: goodsID === undefined ? '' : goodsID,
          },
        });
        break;
      case 'week':
        WeekArr = date.substring(0, 7).split('-');
        [year, week] = WeekArr;
        dispatch({
          type: 'goodsDetailList/getWeek',
          payload: {
            year,
            week,
            searchType: formValue.WeekProduct === '访客数' ? 'VISITUV' : formValue.WeekProduct,
            goodsID: goodsID === undefined ? '' : goodsID,
          },
        });
        break;
      case 'month':
        month = date;
        dispatch({
          type: 'goodsDetailList/getMonth',
          payload: {
            month,
            searchType: formValue.MonthProduct === '访客数' ? 'VISITUV' : formValue.MonthProduct,
            goodsID: goodsID === undefined ? '' : goodsID,
          },
        });
        break;
      default:
        console.log('未获取到日期type');
    }
  }

  // Tabs选择器
  callback = key => {
    const {
      dispatch,
      form: { getFieldsValue },
    } = this.props;
    const { goodsID } = this.state;
    const formValue = getFieldsValue(); // 获取表单数据
    // console.log(formValue);
    this.setState({
      key: key === 'undefined' ? 'day' : key,
    });
    switch (key) {
      case 'day':
        dispatch({
          type: 'goodsDetailList/getDay',
          payload: {
            date: moment(formValue.date).format('YYYY-MM-DD'),
            searchType: formValue.DateProduct === '访客数' ? 'VISITUV' : formValue.DateProduct,
            goodsID: goodsID === undefined ? '' : goodsID,
          },
        });
        break;
      case 'week':
        dispatch({
          type: 'goodsDetailList/getWeek',
          payload: {
            year: moment(formValue.weekDate).format('YYYY'),
            week: moment(formValue.weekDate).format('w'),
            searchType: formValue.WeekProduct === '访客数' ? 'VISITUV' : formValue.WeekProduct,
            goodsID: goodsID === undefined ? '' : goodsID,
          },
        });
        break;
      case 'month':
        dispatch({
          type: 'goodsDetailList/getMonth',
          payload: {
            month: moment(formValue.monthDate).format('YYYY-MM'),
            searchType: formValue.MonthProduct === '访客数' ? 'VISITUV' : formValue.MonthProduct,
            goodsID: goodsID === undefined ? '' : goodsID,
          },
        });
        break;
      default:
        console.log('未获取到key');
    }
  };

  // 下拉选择器
  handleChange = value => {
    // console.log(type); // 选择框类型
    const {
      dispatch,
      form: { getFieldsValue },
    } = this.props;
    const { key, goodsID } = this.state;
    const formValue = getFieldsValue();
    switch (key) {
      case 'day':
        dispatch({
          type: 'goodsDetailList/getDay',
          payload: {
            date: moment(formValue.date).format('YYYY-MM-DD'),
            searchType: value,
            goodsID: goodsID === undefined ? '' : goodsID,
          },
        });
        break;
      case 'week':
        dispatch({
          type: 'goodsDetailList/getWeek',
          payload: {
            year: moment(formValue.weekDate).format('YYYY'),
            week: moment(formValue.weekDate).format('w'),
            searchType: value,
            goodsID: goodsID === undefined ? '' : goodsID,
          },
        });
        break;
      case 'month':
        dispatch({
          type: 'goodsDetailList/getMonth',
          payload: {
            month: moment(formValue.monthDate).format('YYYY-MM'),
            searchType: value,
            goodsID: goodsID === undefined ? '' : goodsID,
          },
        });
        break;
      default:
        console.log('未获取到key');
    }
  };

  // 转换新数组
  convertKey = (arr, obj) => {
    const newArr = [];
    arr.forEach(item => {
      const newObj = {
        eventDate: item.eventDate,
        app: `${item.app}\t\t(${(item.appPercent * 100).toFixed(2)}%)`,
        weChat: `${item.weChat}\t\t(${(item.weChatPercent * 100).toFixed(2)}%)`,
        applet: `${item.applet}\t\t(${(item.appletPercent * 100).toFixed(2)}%)`,
        dateTotal: item.dateTotal,
      };
      newArr.push(newObj);
    });
    const newObj2 = {
      eventDate: '总计',
      app: `${obj.app}\t\t(${(obj.appPercent * 100).toFixed(2)}%)`,
      weChat: `${obj.weChat}\t\t(${(obj.weChatPercent * 100).toFixed(2)}%)`,
      applet: `${obj.applet}\t\t(${(obj.appletPercent * 100).toFixed(2)}%)`,
      dateTotal: obj.dateTotal,
    };
    newArr.push(newObj2);
    return newArr;
  };

  render() {
    const { date, weekDate, monthDate } = this.state;
    const {
      goodsDetailList,
      form: { getFieldDecorator },
    } = this.props;
    const dateArr = goodsDetailList.dateArr && goodsDetailList.dateArr; // 时间数据
    const app = [];
    const weChat = [];
    const applet = [];
    let dataSource = [];
    if (typeof goodsDetailList.goodsDetailEcharts !== 'undefined') {
      for (const i in goodsDetailList.goodsDetailEcharts) {
        if (goodsDetailList.goodsDetailEcharts[i].hasOwnProperty) {
          app.push(goodsDetailList.goodsDetailEcharts[i].app);
          weChat.push(goodsDetailList.goodsDetailEcharts[i].weChat);
          applet.push(goodsDetailList.goodsDetailEcharts[i].applet);
        }
      }
      dataSource = this.convertKey(
        goodsDetailList.goodsDetailEcharts,
        goodsDetailList.goodsDetailTotalTabel
      );
    }
    // 给新数组添加key
    for (const i in dataSource) {
      if (dataSource.hasOwnProperty) {
        dataSource[i].key = i;
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
          data: dateArr,
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
          stack: '总量',
          areaStyle: { normal: {} },
          data: app,
        },
        {
          name: '公众号',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: weChat,
        },
        {
          name: '小程序',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: applet,
        },
      ],
    };

    const columns = [
      {
        title: '日期/时间',
        dataIndex: 'eventDate',
        key: 'eventDate',
      },
      {
        title: 'APP（占比）',
        dataIndex: 'app',
        key: 'app',
      },
      {
        title: '公众号（占比）',
        dataIndex: 'weChat',
        key: 'weChat',
      },
      {
        title: '小程序（占比）',
        dataIndex: 'applet',
        key: 'applet',
      },
      {
        title: '合计',
        dataIndex: 'dateTotal',
        key: 'dateTotal',
      },
    ];
    return (
      <PageHeaderLayout
        title="商品流量详情"
        breadcrumbList={[
          {
            title: '首页',
          },
          {
            title: '商品分析',
            href: '/commodity/survey',
          },
          {
            title: '商品流量分析',
            href: '/commodity/goodsEffect',
          },
          {
            title: '商品流量详情',
          },
        ]}
      >
        <Card>
          <h3>
            {goodsDetailList.goodsDetailEcharts &&
              `${goodsDetailList.goodsDetailEcharts[0].label}\t\t¥${
                goodsDetailList.goodsDetailEcharts[0].price
              }`}
          </h3>
        </Card>
        <Card style={{ marginTop: 32 }}>
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
                          onChange={(_, dateString) => this.onChange(date, dateString, 'day')}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col md={8} sm={24}>
                    <FormItem label="选择类型">
                      {getFieldDecorator('DateProduct', {
                        rules: [
                          {
                            required: true,
                            message: '请选择类型',
                          },
                        ],
                        initialValue: '访客数',
                      })(
                        <Select
                          style={{ width: 120 }}
                          onChange={(value, type) => this.handleChange(value, 'DateProduct')}
                        >
                          <Option value="VISITUV">访客数</Option>
                          <Option value="PAGEVIEWPV">浏览量</Option>
                          <Option value="USERCOUNT">付款人数</Option>
                          <Option value="PAYCOUNT">付款件数</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
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
                          onChange={(_, dateString) => this.onChange(date, dateString, 'week')}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col md={8} sm={24}>
                    <FormItem label="选择类型">
                      {getFieldDecorator('WeekProduct', {
                        rules: [
                          {
                            required: true,
                            message: '请选择类型',
                          },
                        ],
                        initialValue: '访客数',
                      })(
                        <Select
                          style={{ width: 120 }}
                          onChange={(value, type) => this.handleChange(value, 'WeekProduct')}
                        >
                          <Option value="VISITUV">访客数</Option>
                          <Option value="PAGEVIEWPV">浏览量</Option>
                          <Option value="USERCOUNT">付款人数</Option>
                          <Option value="PAYCOUNT">付款件数</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
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
                          onChange={(_, dateString) => this.onChange(date, dateString, 'month')}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col md={8} sm={24}>
                    <FormItem label="选择类型">
                      {getFieldDecorator('MonthProduct', {
                        rules: [
                          {
                            required: true,
                            message: '请选择类型',
                          },
                        ],
                        initialValue: '访客数',
                      })(
                        <Select
                          style={{ width: 120 }}
                          onChange={(value, type) => this.handleChange(value, 'MonthProduct')}
                        >
                          <Option value="VISITUV">访客数</Option>
                          <Option value="PAGEVIEWPV">浏览量</Option>
                          <Option value="USERCOUNT">付款人数</Option>
                          <Option value="PAYCOUNT">付款件数</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Form>
        </Card>
        <Card title="商品访客数趋势分析" style={{ marginTop: 32 }}>
          <ReactEcharts option={option} style={{ height: 500 }} />
        </Card>
        <Card title="商品访客数明细" style={{ marginTop: 32 }}>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
        </Card>
      </PageHeaderLayout>
    );
  }
}
