import dayjs from 'dayjs';
import { baseStyles, themeStyles } from '../../styles/styles';
import clsx from 'clsx';

export default function DateDisplay(): JSX.Element {
  const today = dayjs();
  const formattedDate = today.format('MMMM D, YYYY');

  return (
    <div
      className={clsx(
        baseStyles.flexStart,
        themeStyles.complementaryOffset,
        'p-2 px-4 h-[3.5em] rounded-md mb-4'
      )}
    >
      <h2 data-testid="date-display" className="text-md font-semibold">
        Today is {formattedDate}
      </h2>
    </div>
  );
}
