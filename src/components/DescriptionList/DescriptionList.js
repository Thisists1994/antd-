import React from 'react';
import classNames from 'classnames';
import { Row, Button } from 'antd';
import styles from './index.less';

const DescriptionList = ({
  className,
  title,
  col = 3,
  layout = 'horizontal',
  gutter = 32,
  children,
  size,
  href,
  ...restProps
}) => {
  const clsString = classNames(styles.descriptionList, styles[layout], className, {
    [styles.small]: size === 'small',
    [styles.large]: size === 'large',
  });
  const column = col > 4 ? 4 : col;
  return (
    <div className={clsString} {...restProps}>
      {title ? (
        <div className={styles.title}>
          <span style={{ float: 'left' }}>{title}</span>
          <div className={styles.button}>
            <Button
              type="primary"
              href={href}
            >
              数据导出
            </Button>
          </div>
        </div>
      ) : null}

      <Row gutter={gutter}>
        {React.Children.map(
          children,
          child => (child ? React.cloneElement(child, { column }) : child)
        )}
      </Row>
    </div>
  );
};

export default DescriptionList;
