import clsx from "clsx";
import dayjs from "dayjs";
import { baseStyles } from "./styles/styles";

export default function DateDisplay(): JSX.Element {
    const today = dayjs();
    const formattedDate = today.format('MMMM D, YYYY');
  
    return (
      <div className={clsx(baseStyles.flexStart, "bg-black text-white p-2 px-4 h-[3.5em] rounded-md mb-4")}>
        <h2 className="text-lg font-semibold">Today is {formattedDate}</h2>
      </div>
    );
}