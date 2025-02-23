import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  filterSection: {
    '& + &': {
      marginTop: token.marginLG,
    },
  },
  searchInput: {
    width: '100%',
  },
  priceSlider: {
    marginTop: token.marginMD,
  },
  filterActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: token.padding,
  },
  resetButton: {
    color: token.colorError,
    borderColor: token.colorError,
    '&:hover:not(:disabled)': {
      color: token.colorErrorHover,
      borderColor: token.colorErrorHover,
    },
  },
})); 