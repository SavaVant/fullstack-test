import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  container: {
    padding: token.padding,
    minHeight: '100vh',
    backgroundColor: token.colorBgLayout,
  }
})); 