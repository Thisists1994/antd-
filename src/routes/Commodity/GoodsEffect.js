import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Avatar, Card, Tabs, DatePicker, Select, Row, Col, Input, Form, Table, Button } from 'antd';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';

const FormItem = Form.Item;
// const { Description } = DescriptionList;
const { MonthPicker, WeekPicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;
@Form.create()
@connect(({ goodsEffect, loading }) => ({
  goodsEffect,
  fetching: loading.effects['goodsEffect/getDay'],
}))
export default class GoodsEffect extends Component {
  state = {
    date: moment().add(-1, 'days'),
    weekDate: moment().add(-1, 'week'),
    monthDate: moment().add(-1, 'month'),
    key: 'day',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'goodsEffect/getDay',
    });
  }

  // 日期选择器
  onChange = (_, date, type) => {
    console.log(date);
    console.log(type);
  };

  // 分页器操作
  onPageChange = page => {
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };
      console.log(values);
      // this.state.key
      switch (this.state.key) {
        case 'day':
          dispatch({
            type: 'goodsEffect/getDay',
            payload: {
              date: moment(values.date).format('YYYY-MM-DD'),
              product: values.DateProduct === '全部' ? 0 : values.DateProduct,
              platform: values.DatePlatform === '全平台' ? '' : values.DatePlatform,
              search: values.id,
              page: page,
            },
          });
          break;
        case 'week':
          dispatch({
            type: 'goodsEffect/getWeek',
            payload: {
              year: moment(values.weekDate).format('YYYY'),
              week: moment(values.weekDate).format('w'),
              product: values.WeekProduct === '全部' ? 0 : values.WeekProduct,
              platform: values.WeekPlatform === '全平台' ? '' : values.WeekPlatform,
              search: values.id,
              page: page,
            },
          });
          break;
        case 'month':
          dispatch({
            type: 'goodsEffect/getMonth',
            payload: {
              month: moment(values.monthDate).format('YYYY-MM'),
              product: values.MonthProduct === '全部' ? 0 : values.MonthProduct,
              platform: values.MonthPlatform === '全平台' ? '' : values.MonthPlatform,
              search: values.id,
              page: page,
            },
          });
          break;
        default:
          break;
      }
    });
  };

  // 下拉选择器
  handleChange = (value, type) => {
    console.log(value);
    console.log(type);
  };

  // TableChange
  handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination);
    console.log(filters);
    console.log(sorter);
  };

  // 点击搜索
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { key } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };
      console.log(values);
      switch (key) {
        case 'day':
          dispatch({
            type: 'goodsEffect/getDay',
            payload: {
              date: moment(values.date).format('YYYY-MM-DD'),
              product: values.DateProduct === '全部' ? 0 : values.DateProduct,
              platform: values.DatePlatform === '全平台' ? '' : values.DatePlatform,
              search: values.id,
            },
          });
          break;
        case 'week':
          dispatch({
            type: 'goodsEffect/getWeek',
            payload: {
              year: moment(values.weekDate).format('YYYY'),
              week: moment(values.weekDate).format('w'),
              product: values.WeekProduct === '全部' ? 0 : values.WeekProduct,
              platform: values.WeekPlatform === '全平台' ? '' : values.WeekPlatform,
              search: values.id,
            },
          });
          break;
        case 'month':
          dispatch({
            type: 'goodsEffect/getMonth',
            payload: {
              month: moment(values.monthDate).format('YYYY-MM'),
              product: values.MonthProduct === '全部' ? 0 : values.MonthProduct,
              platform: values.MonthPlatform === '全平台' ? '' : values.MonthPlatform,
              search: values.id,
            },
          });
          break;
        default:
          break;
      }
    });
  };

  // Tabs选择器
  callback = key => {
    // const { dispatch } = this.props;
    // const { getFieldsValue } = this.props.form;
    const {
      dispatch,
      form: { getFieldsValue },
    } = this.props;
    const formValue = getFieldsValue();
    console.log(formValue);
    this.setState({
      key: key === 'undefined' ? 'day' : key,
    });
    switch (key) {
      case 'day':
        dispatch({
          type: 'goodsEffect/getDay',
          payload: {
            date: moment(formValue.date).format('YYYY-MM-DD'),
            product: formValue.DateProduct === '全部' ? 0 : formValue.DateProduct,
            platform: formValue.DatePlatform === '全平台' ? '' : formValue.DatePlatform,
          },
        });
        break;
      case 'week':
        dispatch({
          type: 'goodsEffect/getWeek',
          payload: {
            year: moment(formValue.weekDate).format('YYYY'),
            week: moment(formValue.weekDate).format('w'),
            product: formValue.WeekProduct === '全部' ? 0 : formValue.WeekProduct,
            platform: formValue.WeekPlatform === '全平台' ? '' : formValue.WeekPlatform,
          },
        });
        break;
      case 'month':
        dispatch({
          type: 'goodsEffect/getMonth',
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

  render() {
    const {
      goodsEffect: { goodsDetails, pagination },
      fetching,
    } = this.props;
    const { date, weekDate, monthDate } = this.state;
    const { getFieldDecorator } = this.props.form;
    // 构建自己的翻页器
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: pagination ? pagination.pageSize : 10,
      total: pagination ? pagination.total : 10,
      current: pagination ? pagination.current : 1,
      onChange: this.onPageChange,
    };
    for (let i = 0; i < goodsDetails.length; i++) {
      goodsDetails[i].key = i;
    }
    const dataSource = goodsDetails;
    const columns = [
      {
        title: '商品编号',
        dataIndex: 'goodsID',
        key: 'goodsID',
        align: 'center',
      },
      {
        title: '商品图片',
        dataIndex: 'zoomImg',
        key: 'zoomImg',
        align: 'center',
        render: val => <Avatar size="large" shape="square" src={val} />,
      },
      {
        title: '商品名称',
        dataIndex: 'label',
        key: 'label',
        align: 'center',
      },
      {
        title: '访客数',
        dataIndex: 'visitCount',
        key: 'visitCount',
        align: 'center',
        sorter: true,
        defaultSortOrder: 'descend', // 设置默认排序顺序
        sorter: (a, b) => a.visitCount - b.visitCount, // 对数据进行排序
      },
      {
        title: '浏览量',
        dataIndex: 'visitUV',
        key: 'visitUV',
        align: 'center',
        // defaultSortOrder: 'descend', // 设置默认排序顺序
        sorter: (a, b) => a.visitUV - b.visitUV, // 对数据进行排序
      },
      {
        title: '付款人数',
        dataIndex: 'userCount',
        key: 'userCount',
        align: 'center',
        // defaultSortOrder: 'descend', // 设置默认排序顺序
        sorter: (a, b) => a.userCount - b.userCount, // 对数据进行排序
      },
      {
        title: '单品转化率',
        dataIndex: 'visitToPay',
        key: 'visitToPay',
        align: 'center',
      },
      {
        title: '付款商品件数',
        dataIndex: 'payCount',
        key: 'payCount',
        align: 'center',
        // defaultSortOrder: 'descend', // 设置默认排序顺序
        sorter: (a, b) => a.payCount - b.payCount, // 对数据进行排序
      },
      {
        title: '操作',
        align: 'center',
        render: (val, record) => (
          <Fragment>
            <Link to={{ pathname: `/commodity/detail/${record.goodsID}` }}>查看详情</Link>
          </Fragment>
        ),
      },
    ];
    return (
      <PageHeaderLayout title="商品效果分析">
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
                          onChange={(date, dateString) => this.onChange(date, dateString, 'day')}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col md={5} sm={24}>
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
                        <Select style={{ width: 120 }} onChange={this.handleChange}>
                          <Option value="全平台">全平台</Option>
                          <Option value="APP">APP</Option>
                          <Option value="WeChat">公众号</Option>
                          <Option value="Applet">小程序</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col md={5} sm={24}>
                    <FormItem label="商品关键字">
                      {getFieldDecorator('id')(<Input placeholder="请输入" />)}
                    </FormItem>
                  </Col>
                  <Col md={4} sm={24}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
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
                          onChange={(date, dateString) => this.onChange(date, dateString, 'week')}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col md={5} sm={24}>
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
                        <Select style={{ width: 120 }} onChange={this.handleChange}>
                          <Option value="全平台">全平台</Option>
                          <Option value="APP">APP</Option>
                          <Option value="WeChat">公众号</Option>
                          <Option value="Applet">小程序</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col md={5} sm={24}>
                    <FormItem label="商品关键字">
                      {getFieldDecorator('id')(<Input placeholder="请输入" />)}
                    </FormItem>
                  </Col>
                  <Col md={4} sm={24}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
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
                          onChange={(date, dateString) => this.onChange(date, dateString, 'month')}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col md={5} sm={24}>
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
                        <Select style={{ width: 120 }} onChange={this.handleChange}>
                          <Option value="全平台">全平台</Option>
                          <Option value="APP">APP</Option>
                          <Option value="WeChat">公众号</Option>
                          <Option value="Applet">小程序</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col md={5} sm={24}>
                    <FormItem label="商品关键字">
                      {getFieldDecorator('id')(<Input placeholder="请输入" />)}
                    </FormItem>
                  </Col>
                  <Col md={4} sm={24}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Form>
        </Card>
        <Card bordered={false} style={{ marginTop: 24 }} bodyStyle={{ padding: 8 }}>
          <Table
            loading={fetching}
            dataSource={dataSource}
            columns={columns}
            pagination={paginationProps}
            // onChange={this.handleTableChange}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
