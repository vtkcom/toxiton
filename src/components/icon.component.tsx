export type IconName =
  | "navigate"
  | "plus"
  | "minus"
  | "ton"
  | "ua"
  | "back"
  | "github"
  | "power"
  | "bell"
  | "toncoin"
  | "toxyton";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
  name: IconName;
}

export const Icon: React.FC<Props> = ({ size = 2, name, ...rest }) => {
  return (
    <svg width={`${size}rem`} height={`${size}rem`} {...rest}>
      <use xlinkHref={`#svg-${name}`} />
    </svg>
  );
};
