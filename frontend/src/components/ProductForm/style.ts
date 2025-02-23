import { createStyles } from 'antd-style';
import type { GlobalToken } from 'antd';

export const useStyles = createStyles(({ token }: { token: GlobalToken }) => ({
  container: {
    maxWidth: 800,
    margin: `${token.marginLG}px auto`,
    padding: token.paddingLG,
    background: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowTertiary,
  },
  header: {
    marginBottom: token.marginLG,
    paddingBottom: token.paddingMD,
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
  },
  title: {
    fontSize: token.fontSizeHeading3,
    color: token.colorTextHeading,
    margin: 0,
  },
  form: {
    '& .ant-form-item-label': {
      fontWeight: 500,
    },
  },
  inputNumber: {
    width: '100%',
  },
  uploadContainer: {
    '.ant-upload-select': {
      width: '100% !important',
      height: '200px !important',
      marginBottom: 0,
      backgroundColor: token.colorFillAlter,
      borderRadius: token.borderRadiusLG,
      border: `2px dashed ${token.colorBorder}`,
      transition: 'all 0.3s',
      
      '&:hover': {
        borderColor: token.colorPrimary,
        backgroundColor: token.colorFillContent,
      },
    },
  },
  uploadButton: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: token.colorTextSecondary,

    '.anticon': {
      fontSize: 32,
      color: token.colorTextDescription,
      marginBottom: token.marginXS,
    },
  },
  previewContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: token.borderRadiusLG,

    '&:hover .preview-overlay': {
      opacity: 1,
    },
  },
  preview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  previewOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    opacity: 0,
    transition: 'opacity 0.3s',
    cursor: 'pointer',

    '.anticon': {
      fontSize: 24,
      marginBottom: token.marginXS,
    },
  },
  buttonGroup: {
    display: 'flex',
    gap: token.marginMD,
    marginTop: token.marginLG,
    justifyContent: 'flex-end',
  },
})); 