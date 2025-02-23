import { createStyles } from 'antd-style';
import type { GlobalToken } from 'antd';

export const useStyles = createStyles(({ token }: { token: GlobalToken }) => ({
  container: {
    padding: token.paddingLG,
    textAlign: 'center',
    background: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
    marginTop: token.marginLG,

    '.ant-empty': {
      margin: `${token.marginXL}px 0`,

      '.ant-empty-description': {
        fontSize: token.fontSizeLG,
        color: token.colorTextSecondary,
      },
    },
  },
})); 