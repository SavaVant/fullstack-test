import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './style';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle="Извините, страница не найдена."
        extra={<Button type="primary" onClick={() => navigate('/')}>Вернуться на главную</Button>}
      />
    </div>
  );
};

export default NotFound; 