interface Props {
  size?: number;
  name: "navigate" | "plus" | "minus";
}

export const Icon: React.FC<Props> = ({ size = 2, name }) => {
  return (
    <svg width={`${size}rem`} height={`${size}rem`}>
      <use xlinkHref={`#svg-${name}`} />
    </svg>
  );
};
