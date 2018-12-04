import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Card,
  Tabs,
  DatePicker,
  // Select,
  Row,
  Col,
  Divider,
  Form,
  Tooltip,
  Icon,
  Table,
  Button,
} from 'antd';
import ReactEcharts from 'echarts-for-react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';

// import { Link } from 'dva/router';
const FormItem = Form.Item;
const { Description } = DescriptionList;
const { MonthPicker, WeekPicker } = DatePicker;
// const { Option } = Select;
const { TabPane } = Tabs;
@Form.create()
@connect(({ listData }) => ({
  listData,
}))
export default class Survey extends Component {
  state = {
    date: moment().add(-1, 'days'),
    weekDate: moment().add(-1, 'week'),
    monthDate: moment().add(-1, 'month'),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listData/getDay',
    });
  }

  // 日期选择器
  onChange(_, date, type) {
    let week = '';
    let year = '';
    let month = '';
    let WeekArr = [];
    const { dispatch } = this.props;
    console.log(type);
    switch (type) {
      case 'day':
        dispatch({
          type: 'listData/getDay',
          payload: {
            date,
          },
        });
        break;
      case 'week':
        WeekArr = date.substring(0, 7).split('-');
        [year, week] = WeekArr;
        // year = WeekArr[0];
        // week = WeekArr[1];
        dispatch({
          type: 'listData/getWeek',
          payload: {
            year,
            week,
          },
        });
        break;
      case 'month':
        month = date;
        dispatch({
          type: 'listData/getMonth',
          payload: {
            month,
          },
        });
        break;
      default:
        break;
    }
  }

  // Tabs选择器
  callback = key => {
    const { dispatch } = this.props;
    switch (key) {
      case 'day':
        dispatch({
          type: 'listData/getDay',
        });
        break;
      case 'week':
        dispatch({
          type: 'listData/getWeek',
        });
        break;
      case 'month':
        dispatch({
          type: 'listData/getMonth',
        });
        break;
      default:
        break;
    }
  };

  // 下拉选择器
  handleChange = value => {
    console.log(`selected ${value}`);
  };

  render() {
    const { date, weekDate, monthDate } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { listData } = this.props;
    const payUserCountArr = []; // 付款人数
    const payTotalFeeMoneyArr = []; // 付款金额
    const payGoodsCountArr = []; // 付款件数
    const payOrderCountArr = []; // 付款订单数
    if (typeof listData !== 'undefined') {
      for (let i = 0; i < listData.paySummaryEcharts.length; i = 1 + i) {
        payUserCountArr.push(listData.paySummaryEcharts[i].payUserCount);
        payTotalFeeMoneyArr.push(listData.paySummaryEcharts[i].payTotalFeeMoney);
        payGoodsCountArr.push(listData.paySummaryEcharts[i].payGoodsCount);
        payOrderCountArr.push(listData.paySummaryEcharts[i].payOrderCount);
      }
    }
    const option = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['付款金额', '付款人数', '付款订单数', '付款件数'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: listData.dateArr,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '付款金额',
          type: 'line',
          data: payTotalFeeMoneyArr,
        },
        {
          name: '付款人数',
          type: 'line',
          data: payUserCountArr,
        },
        {
          name: '付款订单数',
          type: 'line',
          data: payOrderCountArr,
        },
        {
          name: '付款件数',
          type: 'line',
          data: payGoodsCountArr,
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
        title: '付款金额',
        dataIndex: 'payTotalFeeMoney',
        key: 'payTotalFeeMoney',
      },
      {
        title: '付款人数',
        dataIndex: 'payUserCount',
        key: 'payUserCount',
      },
      {
        title: '付款订单数',
        dataIndex: 'payOrderCount',
        key: 'payOrderCount',
      },
      {
        title: '付款件数',
        dataIndex: 'payGoodsCount',
        key: 'payGoodsCount',
      },
    ];
    const dataSource = listData.paySummaryEcharts;
    for (let i = 0; i < listData.paySummaryEcharts.length; i = 1 + i) {
      listData.paySummaryEcharts[i].key = i;
    }
    const visitUnitPrice = parseFloat(listData.orderSummary.visitUnitPrice).toFixed(2);
    const visitToConfirm = `${(listData.orderSummary.visitToCreate * 100).toFixed(2)}%`;
    const createToPay = `${(listData.orderSummary.createToPay * 100).toFixed(2)}%`;
    const visitToPay = `${(listData.orderSummary.visitToPay * 100).toFixed(2)}%`;

    // 下载地址
    const extraContent = (
      <Fragment>
        <Button
          type="primary"
          href="http://static.xldf.com.cn/pin-group/upload/excel/120180710154929159.xlsx"
        >
          数据导出
        </Button>
      </Fragment>
    );
    return (
      <PageHeaderLayout title="销售概况">
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
        <Card
          style={{ marginTop: 32 }}
          title="销售数据概况"
          // extra={extraContent}
        >
          <Row>
            <DescriptionList size="large">
              <Description
                term="访客数"
                action={
                  <Tooltip title="统计时间内，店铺所有页面（包括店铺主页、单品页、会员主页等）被访问的去重人数，一个人在统计时间范围内访问多次只记为一个。">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {listData.orderSummary.visitCount}
              </Description>
              <Description
                term="积分消耗总额"
                action={
                  <Tooltip title="积分消耗总额">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {listData.orderSummary.totalScore}
              </Description>
              <Description
                term="优惠券总额"
                action={
                  <Tooltip title="优惠券总额">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {listData.orderSummary.couponFee}
              </Description>
              <Description
                term="退款总额"
                action={
                  <Tooltip title="退款总额">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {listData.orderSummary.refundMoney}
              </Description>
              <Description
                term="下单人数"
                action={
                  <Tooltip title="统计时间内，成功下单的客户数，一人多次下单记为一人（不剔除退款订单）">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {listData.orderSummary.createUserCount}
              </Description>
              <Description
                term="下单笔数"
                action={
                  <Tooltip title="统计时间内，成功下单的订单笔数（不剔除退款订单）">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {listData.orderSummary.createOrderCount}
              </Description>
              <Description
                term="下单金额"
                action={
                  <Tooltip title="统计时间内，成功下单的订单金额（不剔除退款订单）">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                md={10}
              >
                {listData.orderSummary.createTotalFee}
              </Description>

              <Description
                term="付款人数"
                action={
                  <Tooltip title="统计时间内，下单并且付款成功的客户数，一人多次付款记为一人（不剔除退款订单）">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {listData.orderSummary.payUserCount}
              </Description>
              <Description
                term="付款订单数"
                action={
                  <Tooltip title="统计时间内，成功付款的订单数，一个订单对应唯一一个订单号（拼团在成团时计入付款订单；货到付款在发货时计入付款订单，不剔除退款订单）">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {listData.orderSummary.payOrderCount}
              </Description>
              <Description
                term="付款金额"
                action={
                  <Tooltip title="统计时间内，所有付款订单金额之和（拼团在成团时计入付款金额；货到付款在发货时计入付款金额，不剔除退款金额）">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {listData.orderSummary.payTotalFeeMoney}
              </Description>
              <Description
                term="付款件数"
                action={
                  <Tooltip title="统计时间内， 成功付款订单的商品件数之和（不剔除退款订单）">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {listData.orderSummary.payGoodsCount}
              </Description>
              <Description
                term="客单价"
                action={
                  <Tooltip title="统计时间内，付款金额/付款人数">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                md={4}
              >
                {visitUnitPrice}
              </Description>
              <Description
                term="访问-下单转化率"
                action={
                  <Tooltip title="统计时间内，下单人数/访客数">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {visitToConfirm}
              </Description>
              <Description
                term="下单-支付转化率"
                action={
                  <Tooltip title="统计时间内，付款人数/下单人数">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {createToPay}
              </Description>
              <Description
                term="访问-支付转化率"
                action={
                  <Tooltip title="统计时间内，付款人数/访客数">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {visitToPay}
              </Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
          </Row>
        </Card>
        <Card title="销售数据概况趋势分析" style={{ marginTop: 32 }}>
          <ReactEcharts option={option} />
        </Card>
        <Card title="销售数据概况明细" style={{ marginTop: 32 }}>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
        </Card>
      </PageHeaderLayout>
    );
  }
}
