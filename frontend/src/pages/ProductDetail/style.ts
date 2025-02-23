import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: token.paddingMD,
    textAlign: 'center',
  },
  card: {
    padding: token.paddingMD,
    maxWidth: 600,
    width: '100%',
  },
  imageContainer: {
    height: 300,
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
})); 