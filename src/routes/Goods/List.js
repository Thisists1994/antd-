import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Avatar,
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Table,
  Button,
  Tag,
  Divider,
  Popconfirm,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ goodsList, goodsOperation, loading }) => ({
  goodsList,
  goodsOperation,
  fetching: loading.effects['goodsList/fetch'],
}))
@Form.create()
export default class List extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'goodsList/fetch',
    });
  }

  onPageChange = page => {
    const params = {
      page,
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'goodsList/fetch',
      payload: params,
    });
  };

  onChangeStatus = payload => {
    const { id, currentStatus } = payload;
    const { dispatch } = this.props;
    if (currentStatus === 1) {
      dispatch({
        type: 'goodsOperation/offline',
        payload: { id: parseInt(id, 10) },
      });
    } else if (currentStatus === 2) {
      dispatch({
        type: 'goodsOperation/online',
        payload: { id: parseInt(id, 10) },
      });
    }
  };

  onDelete = payload => {
    const { id } = payload;
    const { dispatch } = this.props;
    dispatch({
      type: 'goodsOperation/delete',
      payload: { id: parseInt(id, 10) },
    });
  };

  render() {
    const {
      goodsList: { goodsArr, pagination },
      fetching,
      form,
    } = this.props;

    const { getFieldDecorator } = form;

    // 构建自己的翻页器
    const paginationProps = {
      pageSize: pagination ? pagination.pageSize : 10,
      total: pagination ? pagination.total : 10,
      current: pagination ? pagination.current : 1,
      onChange: this.onPageChange,
    };

    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
      },
      {
        title: '标题',
        dataIndex: 'label',
        key: 'label',
        align: 'center',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render(val) {
          return <Tag color={val === 1 ? 'green' : 'red'}>{val === 1 ? '上架' : '下架'}</Tag>;
        },
      },
      {
        title: '图片',
        dataIndex: 'coverURL',
        key: 'coverURL',
        align: 'center',
        render: val => <Avatar size="large" shape="square" src={val} />,
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        render: (val, record) => {
          return (
            <div>
              <p style={{ color: '#00a65a' }}>
                拼购价：{record.price}/{record.unit}
              </p>
              <p>
                原价：{record.originalPrice}/{record.unit}
              </p>
            </div>
          );
        },
      },
      {
        title: '销量',
        dataIndex: 'saleCount',
        key: 'saleCount',
        align: 'center',
        render: (val, record) => {
          return (
            <div>
              <p style={{ color: '#00a65a' }}>真实销量：{record.originalSaleCount}</p>
              <p>展示销量：{record.saleCount}</p>
            </div>
          );
        },
      },
      {
        title: '库存',
        dataIndex: 'remainCount',
        key: 'remainCount',
        align: 'center',
      },
      {
        title: '拼团人数',
        dataIndex: 'amount',
        key: 'amount',
        align: 'center',
      },
      {
        title: '操作',
        align: 'center',
        render: (val, record) => (
          <Fragment>
            <Link to={{ pathname: `/goods/detail/${record.id}` }}>编辑</Link>
            <Divider type="vertical" />
            <Link to={{ pathname: `/goods/images/${record.id}` }}>相册</Link>
            <Divider type="vertical" />
            <Popconfirm
              title={record.status === 1 ? '确认下架' : '确认上架'}
              onConfirm={this.onChangeStatus.bind(this, {
                id: record.id,
                currentStatus: record.status,
              })}
              okText="确定"
              cancelText="取消"
            >
              <a href="#">{record.status === 1 ? '下架' : '上架'}</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm
              title="确认删除"
              onConfirm={this.onDelete.bind(this, {
                id: record.id,
              })}
              okText="确定"
              cancelText="取消"
            >
              <a href="#">删除</a>
            </Popconfirm>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderLayout>
        <Card bordered={false} style={{ marginTop: 24 }}>
          <Form onSubmit={this.handleSearch} layout="inline">
            <Row>
              <Col md={6} sm={24}>
                <FormItem label="商品关键字">
                  {getFieldDecorator('id')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col md={6} sm={24}>
                <FormItem label="商品状态">
                  {getFieldDecorator('status')(
                    <Select placeholder="请选择" style={{ width: '100px' }}>
                      <Option value="0">全部</Option>
                      <Option value="1">上架</Option>
                      <Option value="2">下架</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col md={6} sm={24}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card
          bordered={false}
          title="商品列表"
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: 8 }}
          extra={
            <Link to="/goods/add">
              <Button type="primary">添加商品</Button>
            </Link>
          }
        >
          <Table
            loading={fetching}
            dataSource={goodsArr}
            columns={columns}
            pagination={paginationProps}
            rowKey="id"
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
