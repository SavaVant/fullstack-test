import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    padding: token.padding,
    backgroundColor: token.colorBgContainer,
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: token.marginLG,
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: token.padding,
  },
  headerIcon: {
    fontSize: token.fontSizeXL,
    color: token.colorPrimary,
  },
})); 