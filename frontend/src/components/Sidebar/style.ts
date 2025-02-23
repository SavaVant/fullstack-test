import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  sidebar: {
    position: 'sticky',
    top: token.margin,
  },
})); 