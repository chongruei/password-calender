import { FC, MouseEventHandler } from "react";

export enum Direction {
  TOP = "top",
  RIGHT = "right",
  DOWN = "down",
  LEFT = "left",
}

const DirectionRecord: Record<Direction, number> = {
  [Direction.TOP]: 90,
  [Direction.RIGHT]: 180,
  [Direction.DOWN]: 270,
  [Direction.LEFT]: 0,
};

interface IArrow {
  direction: Direction;
  className?: string;
  onClick?: MouseEventHandler<SVGElement>;
}

export const Arrow: FC<IArrow> = ({ direction, className, onClick }) => (
  <svg
    width="8"
    height="12"
    viewBox="0 0 8 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
    style={{ transform: `rotate(${DirectionRecord[direction]}deg)` }}
  >
    <path
      d="M7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.59Z"
      fill="white"
    />
  </svg>
);
