interface WeatherDescriptionProps {
  description: string;
  className?: string;
}

export default function WeatherDescription({
  description,
  className,
}: WeatherDescriptionProps) {
  return (
    <p
      className={`text-sm italic capitalize ${className}`}
      data-testid="weather-description"
    >
      {description}
    </p>
  );
}
