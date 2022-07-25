import { Arrow, Direction } from "@components/icons/arrow";
import { FC, MouseEventHandler } from "react";

export enum SilderMode {
  Month = "month",
  Year = "year",
}

interface IProps {
  children: React.ReactNode;
  onSubTime: MouseEventHandler<SVGElement>;
  onAddTime: MouseEventHandler<SVGElement>;
}

export const TimeSilder: FC<IProps> = ({ onAddTime, onSubTime, children }) => {
  return (
    <div className="w-full px-1 flex justify-between items-center">
      <Arrow
        data-testid="calendar-time-sub"
        className="hover:cursor-pointer"
        direction={Direction.LEFT}
        onClick={onSubTime}
      />
      {children}
      <Arrow
        data-testid="calendar-time-add"
        className="hover:cursor-pointer"
        direction={Direction.RIGHT}
        onClick={onAddTime}
      />
    </div>
  );
};
