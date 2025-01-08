import clsx from 'clsx';
import Icon from './Icon/Icon';
import { themeStyles } from 'src/styles/styles';
import ThemeToggle from './ThemeToggle/ThemeToggle';
import Logo from 'src/icons/Logo';

export default function LeftPanelErrorState(): JSX.Element {
  return (
    <div className='bg-background-secondary h-full'>
      <div
        className={clsx(
          'flex items-center justify-start space-between flex-wrap p-4',
          'w-full text-foreground h-[3.5em] mb-4'
        )}
      >
        <Logo width={250} height={18} />
        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />
        </div>
      </div>
      <div className={clsx(themeStyles.text, "flex flex-col items-center justify-start  p-4 text-center")}>
        <Icon name="balloon" fill="transparent" size={42} />
        <h2 className="text-xl font-bold mb-4">
          Oops! Our weather balloons got lost
        </h2>
        <p className="text-muted-foreground mb-4">
          We&#39;re having trouble fetching the latest weather data.
        </p>
        <div className="bg-background p-6 mt-auto rounded-lg">
          <h3 className="font-semibold my-4">
            While we&#39;re sorting things out, why not:
          </h3>
          <ul className="text-left ml-4 mb-4 list-disc">
            <li>Look out your window for a quick weather check</li>
            <li>Practice your rain dance (who knows, it might help!)</li>
            <li>Imagine your perfect weather day</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-4 mt-auto">
          <button
            className={clsx(themeStyles.complementaryOffset, "px-4 py-2 mt-auto rounded hover-gradient transition-colors flex items-center")}
            onClick={() => window.location.reload()}
          >
            <span>
              <Icon name="refresh" stroke="white" />
            </span>
            <span>Try Again</span>
          </button>
          <p className="mt-4 text-sm text-muted-foreground flex items-center">
            If the problem persists, our meteorologists might need a coffee break!
          </p>
        </div>
    </div>
  );
}
