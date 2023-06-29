interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
  name:
    | "navigate"
    | "plus"
    | "minus"
    | "ton"
    | "ua"
    | "back"
    | "github"
    | "power";
}

export const Icon: React.FC<Props> = ({ size = 2, name, ...rest }) => {
  return (
    <svg width={`${size}rem`} height={`${size}rem`} {...rest}>
      <use xlinkHref={`#svg-${name}`} />
    </svg>
  );
};
