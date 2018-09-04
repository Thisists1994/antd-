import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Tabs, DatePicker, Select, Row, Col, Form, Tooltip, Icon, Table } from 'antd';
import ReactEcharts from 'echarts-for-react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';

const FormItem = Form.Item;
const { Description } = DescriptionList;
const { MonthPicker, WeekPicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;
@Form.create()
@connect(({ behavior }) => ({
  behavior,
}))
export default class Survey extends Component {
  state = {
    date: moment().add(-1, 'days'),
    weekDate: moment().add(-1, 'week'),
    monthDate: moment().add(-1, 'month'),
    dateKey: 'day',
    behaviorkey: '0',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'behavior/getDay',
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
    const { behaviorkey } = this.state;
    const { dispatch } = this.props;
    const formValue = getFieldsValue();
    switch (type) {
      case 'day':
        dispatch({
          type: 'behavior/getDay',
          payload: {
            date,
            platform: formValue.DatePlatform === '全平台' ? '' : formValue.DatePlatform,
            behavior: behaviorkey,
          },
        });
        break;
      case 'week':
        WeekArr = date.substring(0, 7).split('-');
        [year, week] = WeekArr;
        dispatch({
          type: 'behavior/getWeek',
          payload: {
            year,
            week,
            platform: formValue.WeekPlatform === '全平台' ? '' : formValue.WeekPlatform,
            behavior: behaviorkey,
          },
        });
        break;
      case 'month':
        month = date;
        dispatch({
          type: 'behavior/getMonth',
          payload: {
            month,
            platform: formValue.MonthPlatform === '全平台' ? '' : formValue.MonthPlatform,
            behavior: behaviorkey,
          },
        });
        break;
      default:
        break;
    }
  }

  // Tabs选择器
  callback = key => {
    const {
      dispatch,
      form: { getFieldsValue },
    } = this.props;
    const { behaviorkey } = this.state;
    const formValue = getFieldsValue(); // 获取表单数据
    // console.log(formValue);
    this.setState({
      dateKey: key === 'undefined' ? 'day' : key,
    });
    switch (key) {
      case 'day':
        dispatch({
          type: 'behavior/getDay',
          payload: {
            date: moment(formValue.date).format('YYYY-MM-DD'),
            platform: formValue.DatePlatform === '全平台' ? '' : formValue.DatePlatform,
            behavior: behaviorkey,
          },
        });
        break;
      case 'week':
        dispatch({
          type: 'behavior/getWeek',
          payload: {
            year: moment(formValue.weekDate).format('YYYY'),
            week: moment(formValue.weekDate).format('w'),
            platform: formValue.WeekPlatform === '全平台' ? '' : formValue.WeekPlatform,
            behavior: behaviorkey,
          },
        });
        break;
      case 'month':
        dispatch({
          type: 'behavior/getMonth',
          payload: {
            month: moment(formValue.monthDate).format('YYYY-MM'),
            platform: formValue.MonthPlatform === '全平台' ? '' : formValue.MonthPlatform,
            behavior: behaviorkey,
          },
        });
        break;
      default:
        break;
    }
  };

  // 行为Tab选择
  behaviorCallback = key => {
    const { dateKey } = this.state;
    const {
      dispatch,
      form: { getFieldsValue },
    } = this.props;
    this.setState({
      behaviorkey: key === 'undefined' ? '0' : key,
    });
    const formValue = getFieldsValue(); // 获取表单数据
    switch (dateKey) {
      case 'day':
        dispatch({
          type: 'behavior/getDay',
          payload: {
            date: moment(formValue.date).format('YYYY-MM-DD'),
            platform: formValue.DatePlatform === '全平台' ? '' : formValue.DatePlatform,
            behavior: key,
          },
        });
        break;
      case 'week':
        dispatch({
          type: 'behavior/getWeek',
          payload: {
            year: moment(formValue.weekDate).format('YYYY'),
            week: moment(formValue.weekDate).format('w'),
            platform: formValue.WeekPlatform === '全平台' ? '' : formValue.WeekPlatform,
            behavior: key,
          },
        });
        break;
      case 'month':
        dispatch({
          type: 'behavior/getMonth',
          payload: {
            month: moment(formValue.monthDate).format('YYYY-MM'),
            platform: formValue.MonthPlatform === '全平台' ? '' : formValue.MonthPlatform,
            behavior: key,
          },
        });
        break;
      default:
        break;
    }
  };

  // 下拉选择器
  handleChange = value => {
    console.log(value);
    const {
      dispatch,
      form: { getFieldsValue },
    } = this.props;
    const { dateKey, behaviorkey } = this.state;
    const formValue = getFieldsValue();
    switch (dateKey) {
      case 'day':
        dispatch({
          type: 'behavior/getDay',
          payload: {
            date: moment(formValue.date).format('YYYY-MM-DD'),
            platform: value === '全平台' ? '' : value,
            behavior: behaviorkey,
          },
        });
        break;
      case 'week':
        dispatch({
          type: 'behavior/getWeek',
          payload: {
            year: moment(formValue.weekDate).format('YYYY'),
            week: moment(formValue.weekDate).format('w'),
            platform: value === '全平台' ? '' : value,
            behavior: behaviorkey,
          },
        });
        break;
      case 'month':
        dispatch({
          type: 'behavior/getMonth',
          payload: {
            month: moment(formValue.monthDate).format('YYYY-MM'),
            platform: value === '全平台' ? '' : value,
            behavior: behaviorkey,
          },
        });
        break;
      default:
        break;
    }
  };

  // 转换新数组
  convertKey = arr => {
    const newArr = [];
    arr.forEach(item => {
      const newObj = {
        pageName: item.pageName,
        pv: item.pv,
        pvPercent: `${(item.pvPercent * 100).toFixed(2)}%`,
        stay: item.stay,
        stayPercent: `${(item.stayPercent * 100).toFixed(2)}%`,
        exitPercent: `${(item.exitPercent * 100).toFixed(2)}%`,
      };
      newArr.push(newObj);
    });
    return newArr;
  };

  // 转换新数组
  convertKey2 = arr => {
    const newArr = [];
    arr.forEach(item => {
      const newObj = {
        pageName: item.pageName,
        pv: item.pv,
        percent: `${(item.percent * 100).toFixed(2)}%`,
      };
      newArr.push(newObj);
    });
    return newArr;
  };

  render() {
    const { date, weekDate, monthDate } = this.state;
    const {
      behavior,
      form: { getFieldDecorator },
    } = this.props;
    const count = [];
    let details = [];
    const next = [];
    if (typeof behavior.echarts !== 'undefined') {
      for (let i = 0; i < behavior.echarts.length; i = 1 + i) {
        if (behavior.echarts[i].hasOwnProperty) {
          count.push(behavior.echarts[i].count);
        }
      }
      details = this.convertKey(behavior.details);
      for (let i = 0; i < behavior.details.length; i = 1 + i) {
        if (behavior.details[i].hasOwnProperty) {
          next.push(behavior.details[i].next);
        }
      }
    }

    // 给新数组添加key
    for (const i in details) {
      if (details.hasOwnProperty) {
        details[i].key = i;
      }
    }

    const option = {
      xAxis: {
        type: 'category',
        data: behavior.dataArr,
      },
      tooltip: {
        trigger: 'axis',
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: count,
          type: 'line',
        },
      ],
    };

    const expandedRowRender = record => {
      const { key } = record;// 拿到每个父级表单的key
      const innerTableData = this.convertKey2(next[key]);
      // 给新数组添加key
      for (const i in innerTableData) {
        if (innerTableData.hasOwnProperty) {
          innerTableData[i].key = i;
        }
      }
      const columns = [
        { title: '页面备注', dataIndex: 'pageName', key: 'pageName', align: 'center' },
        { title: '跳转次数', dataIndex: 'pv', key: 'pv', align: 'center' },
        { title: '占比', dataIndex: 'percent', key: 'percent', align: 'center' },
      ];
      return <Table columns={columns} dataSource={innerTableData} pagination={false} />;
    };

    const columns = [
      { title: '访问页面名称', dataIndex: 'pageName', key: 'pageName', align: 'center' },
      { title: '访问次数', dataIndex: 'pv', key: 'pv', align: 'center' },
      { title: '访问次数占比', dataIndex: 'pvPercent', key: 'pvPercent', align: 'center' },
      { title: '次均停留时间', dataIndex: 'stay', key: 'stay', align: 'center' },
      { title: '停留时间占比', dataIndex: 'stayPercent', key: 'stayPercent', align: 'center' },
      { title: '退出率', dataIndex: 'exitPercent', key: 'exitPercent', align: 'center' },
    ];

    return (
      <PageHeaderLayout title="页面分析">
        <Card>
          <Form onSubmit={this.handleSearch} layout="inline">
            <Tabs onSubmit={this.handleSearch} onChange={this.callback} type="card">
              <TabPane tab="日数据" key="day">
                <Row>
                  <Col md={5} sm={24}>
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
                  <Col md={5} sm={24}>
                    <FormItem label="选择平台">
                      {getFieldDecorator('DatePlatform', {
                        rules: [
                          {
                            required: true,
                            message: '请选择平台',
                          },
                        ],
                        initialValue: '全平台',
                      })(
                        <Select style={{ width: 120 }} onChange={value => this.handleChange(value)}>
                          <Option value="全平台">全平台</Option>
                          <Option value="APP">APP</Option>
                          <Option value="WeChat">公众号</Option>
                          <Option value="Applet">小程序</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="周数据" key="week">
                <Row>
                  <Col md={5} sm={24}>
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
                  <Col md={5} sm={24}>
                    <FormItem label="选择平台">
                      {getFieldDecorator('WeekPlatform', {
                        rules: [
                          {
                            required: true,
                            message: '请选择平台',
                          },
                        ],
                        initialValue: '全平台',
                      })(
                        <Select style={{ width: 120 }} onChange={value => this.handleChange(value)}>
                          <Option value="全平台">全平台</Option>
                          <Option value="APP">APP</Option>
                          <Option value="WeChat">公众号</Option>
                          <Option value="Applet">小程序</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="月数据" key="month">
                <Row>
                  <Col md={5} sm={24}>
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
                  <Col md={5} sm={24}>
                    <FormItem label="选择平台">
                      {getFieldDecorator('MonthPlatform', {
                        rules: [
                          {
                            required: true,
                            message: '请选择平台',
                          },
                        ],
                        initialValue: '全平台',
                      })(
                        <Select style={{ width: 120 }} onChange={value => this.handleChange(value)}>
                          <Option value="全平台">全平台</Option>
                          <Option value="APP">APP</Option>
                          <Option value="WeChat">公众号</Option>
                          <Option value="Applet">小程序</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Form>
        </Card>
        <Card
          style={{ marginTop: 32 }}
          title="页面访问概况"
          // extra={extraContent}
        >
          <Row>
            <DescriptionList size="large">
              <Description
                term="访问人数"
                action={
                  <Tooltip title="统计周期内，所有独立访客数（去重）">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {behavior.summary && behavior.summary.uv}
              </Description>
              <Description
                term="访问次数"
                action={
                  <Tooltip title="页面被访问的次数，多次跳转重复访问也会被计入">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {behavior.summary && behavior.summary.pv}
              </Description>
              <Description
                term="次均停留时间"
                action={
                  <Tooltip title="用户访问当前页面的次均停留时间（总停留时长/访问次数）">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {behavior.summary && parseFloat(behavior.summary.avgStay).toFixed(2)}秒
              </Description>
              <Description
                term="退出率"
                action={
                  <Tooltip title="用户从当前页面离开应用的比例">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {behavior.summary && behavior.summary.exitPercent}
              </Description>
            </DescriptionList>
          </Row>
        </Card>
        <Card
          style={{ marginTop: 32 }}
          // extra={extraContent}
        >
          <Tabs onChange={this.behaviorCallback}>
            <TabPane tab="访问人数" key="0">
              <ReactEcharts option={option} />
            </TabPane>
            <TabPane tab="访问次数" key="1">
              <ReactEcharts option={option} />
            </TabPane>
            <TabPane tab="次均停留时长" key="2">
              <ReactEcharts option={option} />
            </TabPane>
            <TabPane tab="退出率" key="3">
              <ReactEcharts option={option} />
            </TabPane>
          </Tabs>
        </Card>
        <Card style={{ marginTop: 32 }} title="页面访问明细">
          <Table
            className="components-table-demo-nested"
            columns={columns}
            expandedRowRender={expandedRowRender}
            dataSource={details}
            pagination={false}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
