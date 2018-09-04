import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Card,
  Tabs,
  DatePicker,
  Select,
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

const FormItem = Form.Item;
const { Description } = DescriptionList;
const { MonthPicker, WeekPicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;
// const Option = Select.Option;
// const TabPane = Tabs.TabPane;
@Form.create()
@connect(({ listGoodsData }) => ({
  listGoodsData,
}))
export default class Survey extends Component {
  state = {
    date: moment().add(-1, 'days'),
    weekDate: moment().add(-1, 'week'),
    monthDate: moment().add(-1, 'month'),
    key: 'day',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listGoodsData/getDay',
    });
  }

  // 日期选择器
  onChange(_, date, type) {
    let week = '';
    let year = '';
    let month = '';
    let WeekArr = [];
    const {
      dispatch,
      form: { getFieldsValue },
    } = this.props;
    // const { getFieldsValue } = this.props.form;
    // const { dispatch } = this.props;
    // let formValue;
    const formValue = getFieldsValue();
    switch (type) {
      case 'day':
        dispatch({
          type: 'listGoodsData/getDay',
          payload: {
            date,
            product: formValue.DateProduct === '全部' ? 0 : formValue.DateProduct,
            platform: formValue.DatePlatform === '全平台' ? '' : formValue.DatePlatform,
          },
        });
        break;
      case 'week':
        WeekArr = date.substring(0, 7).split('-');
        [year, week] = WeekArr;
        // year = WeekArr[0];
        // week = WeekArr[1];
        dispatch({
          type: 'listGoodsData/getWeek',
          payload: {
            year,
            week,
            product: formValue.WeekProduct === '全部' ? 0 : formValue.WeekProduct,
            platform: formValue.WeekPlatform === '全平台' ? '' : formValue.WeekPlatform,
          },
        });
        break;
      case 'month':
        month = date;
        dispatch({
          type: 'listGoodsData/getMonth',
          payload: {
            month,
            product: formValue.MonthProduct === '全部' ? 0 : formValue.MonthProduct,
            platform: formValue.MonthPlatform === '全平台' ? '' : formValue.MonthPlatform,
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
    // const { dispatch } = this.props;
    // const { getFieldsValue } = this.props.form;
    // let formValue;
    const formValue = getFieldsValue();
    console.log(formValue);
    switch (key) {
      case 'day':
        this.setState({
          key: 'day',
        });
        dispatch({
          type: 'listGoodsData/getDay',
          payload: {
            date: moment(formValue.date).format('YYYY-MM-DD'),
            product: formValue.DateProduct === '全部' ? 0 : formValue.DateProduct,
            platform: formValue.DatePlatform === '全平台' ? '' : formValue.DatePlatform,
          },
        });
        break;
      case 'week':
        this.setState({
          key: 'week',
        });
        dispatch({
          type: 'listGoodsData/getWeek',
          payload: {
            year: moment(formValue.weekDate).format('YYYY'),
            week: moment(formValue.weekDate).format('w'),
            product: formValue.WeekProduct === '全部' ? 0 : formValue.WeekProduct,
            platform: formValue.WeekPlatform === '全平台' ? '' : formValue.WeekPlatform,
          },
        });
        break;
      case 'month':
        this.setState({
          key: 'month',
        });
        dispatch({
          type: 'listGoodsData/getMonth',
          payload: {
            month: moment(formValue.monthDate).format('YYYY-MM'),
            product: formValue.MonthProduct === '全部' ? 0 : formValue.MonthProduct,
            platform: formValue.MonthPlatform === '全平台' ? '' : formValue.MonthPlatform,
          },
        });
        break;
      default:
        break;
    }
  };

  // 下拉选择器
  handleChange = (value, type) => {
    const {
      dispatch,
      form: { getFieldsValue },
    } = this.props;
    const { key } = this.state;
    // const { getFieldsValue } = this.props.form;
    // const { dispatch } = this.props;
    // let formValue;
    const formValue = getFieldsValue();
    switch (key) {
      case 'day':
        if (type === 'DateProduct') {
          dispatch({
            type: 'listGoodsData/getDay',
            payload: {
              date: moment(formValue.date).format('YYYY-MM-DD'),
              product: value,
              platform: formValue.DatePlatform === '全平台' ? '' : formValue.DatePlatform,
            },
          });
        } else {
          dispatch({
            type: 'listGoodsData/getDay',
            payload: {
              date: moment(formValue.date).format('YYYY-MM-DD'),
              product: formValue.DateProduct === '全部' ? 0 : formValue.DateProduct,
              platform: value === '全平台' ? '' : value,
            },
          });
        }
        break;
      case 'week':
        if (type === 'WeekProduct') {
          dispatch({
            type: 'listGoodsData/getWeek',
            payload: {
              year: moment(formValue.weekDate).format('YYYY'),
              week: moment(formValue.weekDate).format('w'),
              product: value,
              platform: formValue.WeekPlatform === '全平台' ? '' : formValue.WeekPlatform,
            },
          });
        } else {
          dispatch({
            type: 'listGoodsData/getWeek',
            payload: {
              year: moment(formValue.weekDate).format('YYYY'),
              week: moment(formValue.weekDate).format('w'),
              product: formValue.WeekProduct === '全部' ? 0 : formValue.WeekProduct,
              platform: value === '全平台' ? '' : value,
            },
          });
        }
        break;
      case 'month':
        if (type === 'MonthProduct') {
          dispatch({
            type: 'listGoodsData/getMonth',
            payload: {
              month: moment(formValue.monthDate).format('YYYY-MM'),
              product: value,
              platform: formValue.MonthPlatform === '全平台' ? '' : formValue.MonthPlatform,
            },
          });
        } else {
          dispatch({
            type: 'listGoodsData/getMonth',
            payload: {
              month: moment(formValue.monthDate).format('YYYY-MM'),
              product: formValue.MonthProduct === '全部' ? 0 : formValue.MonthProduct,
              platform: value === '全平台' ? '' : value,
            },
          });
        }
        break;
      default:
        break;
    }
  };

  render() {
    const { date, weekDate, monthDate } = this.state;
    const {
      listGoodsData,
      form: { getFieldDecorator },
    } = this.props;
    // const { getFieldDecorator } = this.props.form;
    // const { dispatch, listGoodsData } = this.props;
    const onlineCountArr = []; // 在架商品数
    const visitCountArr = []; // 被访问商品数
    const pageviewPvArr = []; // 商品浏览量
    const visitUVArr = []; // 商品访客数
    const payGoodsCountArr = []; // 付款商品数
    if (typeof listGoodsData !== 'undefined') {
      for (let i = 0; i < listGoodsData.goodsSummaryEcharts.length; i = 1 + i) {
        onlineCountArr.push(listGoodsData.goodsSummaryEcharts[i].onlineCount);
        visitCountArr.push(listGoodsData.goodsSummaryEcharts[i].visitCount);
        pageviewPvArr.push(listGoodsData.goodsSummaryEcharts[i].pageviewPv);
        visitUVArr.push(listGoodsData.goodsSummaryEcharts[i].visitUV);
        payGoodsCountArr.push(listGoodsData.goodsSummaryEcharts[i].payGoodsCount);
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
        data: ['在架商品数', '被访问商品数', '商品访客数', '商品浏览量', '付款商品数'],
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
        data: listGoodsData.dateArr,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '在架商品数',
          type: 'line',
          data: onlineCountArr,
        },
        {
          name: '被访问商品数',
          type: 'line',
          data: visitCountArr,
        },
        {
          name: '商品访客数',
          type: 'line',
          data: visitUVArr,
        },
        {
          name: '商品浏览量',
          type: 'line',
          data: pageviewPvArr,
        },
        {
          name: '付款商品数',
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
        title: '在架商品数',
        dataIndex: 'onlineCount',
        key: 'onlineCount',
      },
      {
        title: '被访问商品数',
        dataIndex: 'visitCount',
        key: 'visitCount',
      },
      {
        title: '商品访客数',
        dataIndex: 'visitUV',
        key: 'visitUV',
      },
      {
        title: '商品浏览量',
        dataIndex: 'pageviewPv',
        key: 'pageviewPv',
      },
      {
        title: '付款商品数',
        dataIndex: 'payGoodsCount',
        key: 'payGoodsCount',
      },
    ];
    const dataSource = listGoodsData.goodsSummaryEcharts;
    for (let i = 0; i < listGoodsData.goodsSummaryEcharts.length; i = 1 + i) {
      listGoodsData.goodsSummaryEcharts[i].key = i;
    }
    const visitToPay = (listGoodsData.goodsSummart.visitToPay * 100).toFixed(2) + '%';
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
      <PageHeaderLayout title="商品概况">
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
                  <Col md={8} sm={24}>
                    <FormItem label="选择产品">
                      {getFieldDecorator('DateProduct', {
                        rules: [
                          {
                            required: true,
                            message: '请选择产品',
                          },
                        ],
                        initialValue: '全部',
                      })(
                        <Select
                          style={{ width: 120 }}
                          onChange={(value, type) => this.handleChange(value, 'DateProduct')}
                        >
                          <Option value="0">全部</Option>
                          <Option value="2">幸福场</Option>
                          <Option value="11">幸福到家</Option>
                          <Option value="12">积分商城</Option>
                          <Option value="13">东方预售</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col md={8} sm={24}>
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
                        <Select style={{ width: 120 }} onChange={this.handleChange}>
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
                  <Col md={8} sm={24}>
                    <FormItem label="选择产品">
                      {getFieldDecorator('WeekProduct', {
                        rules: [
                          {
                            required: true,
                            message: '请选择产品',
                          },
                        ],
                        initialValue: '全部',
                      })(
                        <Select
                          style={{ width: 120 }}
                          onChange={(value, type) => this.handleChange(value, 'WeekProduct')}
                        >
                          <Option value="0">全部</Option>
                          <Option value="2">幸福场</Option>
                          <Option value="11">幸福到家</Option>
                          <Option value="12">积分商城</Option>
                          <Option value="13">东方预售</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col md={8} sm={24}>
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
                        <Select style={{ width: 120 }} onChange={this.handleChange}>
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
                  <Col md={8} sm={24}>
                    <FormItem label="选择产品">
                      {getFieldDecorator('MonthProduct', {
                        rules: [
                          {
                            required: true,
                            message: '请选择产品',
                          },
                        ],
                        initialValue: '全部',
                      })(
                        <Select
                          style={{ width: 120 }}
                          onChange={(value, type) => this.handleChange(value, 'MonthProduct')}
                        >
                          <Option value="0">全部</Option>
                          <Option value="2">幸福场</Option>
                          <Option value="11">幸福到家</Option>
                          <Option value="12">积分商城</Option>
                          <Option value="13">东方预售</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col md={8} sm={24}>
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
                        <Select style={{ width: 120 }} onChange={this.handleChange}>
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
          title="商品概况"
          // extra={extraContent}
        >
          <Row>
            <DescriptionList size="large">
              <Description
                term="在架商品数"
                action={
                  <Tooltip title="统计时间内，在架的商品数之和，包含出售中的商品和已售罄商品">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {listGoodsData.goodsSummart.onlineCount}
              </Description>
              <Description
                term="被访问商品数"
                action={
                  <Tooltip title="统计时间内，商品详情页浏览次数大于0的商品数">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {listGoodsData.goodsSummart.visitCount}
              </Description>
              <Description
                term="商品访客数UV"
                action={
                  <Tooltip title="统计时间内，商品详情页被访问的去重人数，一个人在统计时间范围内访问多次只记为一个。">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {listGoodsData.goodsSummart.visitUV}
              </Description>
              <Description
                term="商品浏览量PV"
                action={
                  <Tooltip title="统计时间内，商品详情页被访问的次数，一个人在统计时间内访问多次记为多次。">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {listGoodsData.goodsSummart.pageviewPv}
              </Description>
              <Description
                term="付款商品数"
                action={
                  <Tooltip title="统计时间内，成功付款的商品数（拼团在成团时计入付款订单；货到付款在发货时计入付款订单，不剔除退款订单）">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              >
                {listGoodsData.goodsSummart.payGoodsCount}
              </Description>
              <Description
                term="商品访问付款转换率"
                action={
                  <Tooltip title="统计时间内， 商品付款人数 / 商品访客数">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                md={10}
              >
                {visitToPay}
              </Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
          </Row>
        </Card>
        <Card title="商品概况趋势分析" style={{ marginTop: 32 }}>
          <ReactEcharts option={option} />
        </Card>
        <Card title="商品概况明细" style={{ marginTop: 32 }}>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
        </Card>
      </PageHeaderLayout>
    );
  }
}
