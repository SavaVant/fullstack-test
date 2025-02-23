import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  totalCount: {
    display: 'block',
    marginBottom: token.margin,
  },
  cardGrid: {
    marginBottom: token.marginLG,
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
})); 