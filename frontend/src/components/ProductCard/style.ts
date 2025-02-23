import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  card: {
    height: '100%',
    transition: 'all 0.3s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: token.boxShadowSecondary,
    }
  },
  imageContainer: {
    height: 200,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: token.colorFillAlter,
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  noImage: {
    height: 200,
    backgroundColor: token.colorFillQuaternary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: token.colorTextDisabled,
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: token.paddingXS,
  },
  description: {
    minHeight: 44,
    margin: 0,
    fontSize: token.fontSizeSM,
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: token.marginXS,
    marginTop: token.marginXS,
  },
  price: {
    fontSize: token.fontSizeLG,
    fontWeight: 'bold',
    color: token.colorPrimary,
  },
  oldPrice: {
    fontSize: token.fontSizeSM,
    color: token.colorTextDisabled,
    textDecoration: 'line-through',
  },
  articleNumber: {
    fontSize: token.fontSizeSM,
    color: token.colorTextSecondary,
  },
  articleNumberText: {
    fontSize: token.fontSizeSM,
  },
}));