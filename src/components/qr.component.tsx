import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import styled from "styled-components";

const Qr = styled.div`
  border-radius: 1.5rem;
  /* background-color: #fff; */
  display: grid;
  width: fit-content;
`;

const qrCode = new QRCodeStyling({
  width: 250,
  height: 250,
  margin: 0,
  type: "canvas",
  qrOptions: {
    errorCorrectionLevel: "L",
  },
  backgroundOptions: {
    color: "transparent",
  },
  imageOptions: {
    margin: 3,
    hideBackgroundDots: true,
    imageSize: 0.4,
  },
  dotsOptions: {
    type: "extra-rounded",
    color: window.Telegram.WebApp.themeParams.button_color ?? "#3390ec",
    // gradient: {
    //   type: "linear",
    //   rotation: 45,
    //   colorStops: [
    //     { offset: 0, color: window.Telegram.WebApp.themeParams.text_color },
    //     { offset: 1, color: "#666" },
    //   ],
    // },
  },
  cornersSquareOptions: {
    type: "extra-rounded",
    color: window.Telegram.WebApp.themeParams.button_color ?? "#3390ec",
  },
  cornersDotOptions: {
    type: "dot",
    color: window.Telegram.WebApp.themeParams.button_color ?? "#3390ec",
  },
});

interface Props {
  url: string;
}

export const QRCode: React.FC<Props> = ({ url }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(init, [ref.current, url]);

  function init() {
    if (ref.current && url) {
      qrCode.append(ref?.current ?? undefined);
      qrCode.update({
        data: url,
      });
    }
  }

  return <Qr ref={ref} />;
};
