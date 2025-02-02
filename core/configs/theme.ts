import type { ConfigProviderProps } from "antd";
import datePickerTH from "antd/es/date-picker/locale/th_TH";
import thTH from "antd/locale/th_TH";

const theme: ConfigProviderProps = {
  theme: {
    components: {
      Typography: {
        fontSizeHeading5: 18,
        titleMarginBottom: "0"
      },
      Layout: {
        headerBg: "inherit",
        siderBg: "inherit"
      },
      Divider: {
        marginLG: 12
      },
      Menu: {
        colorPrimary: "#006549",
        itemSelectedBg: "#006549",
        itemSelectedColor: "#FFF"
      },
      Button: {
        colorPrimary: "#21ADA4",
        colorPrimaryActive: "#0f7069",
        colorPrimaryHover: "#64c2bc",
        defaultHoverBg: "none",
        defaultHoverBorderColor: "none",
        colorIconHover: "none",
        defaultHoverColor: "none",
        colorError: "#AF0808",
        colorErrorActive: "#af0808",
        colorErrorHover: "#d93d3d"
        // controlHeightLG: 50
      },
      Table: {
        headerColor: "#006549",
        headerBg: "#EDFFFA"
      }
    },
    token: {
      // motion: false,
      fontFamily: "inherit",
      colorPrimary: "#006549" // Primary color for highlights
    }
  },
  wave: { disabled: true },
  locale: {
    ...thTH,
    DatePicker: {
      ...datePickerTH,
      lang: {
        ...datePickerTH.lang,
        fieldDateFormat: "DD/MM/BBBB",
        fieldDateTimeFormat: "DD/MM/BBBB HH:mm:ss",
        yearFormat: "BBBB",
        cellYearFormat: "BBBB"
      }
    }
  }
};

export default theme;
