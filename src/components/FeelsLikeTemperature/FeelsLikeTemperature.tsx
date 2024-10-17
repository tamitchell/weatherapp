import { Units } from "src/types/types";

interface FeelsLikeTemperatureProps {
    feelsLike: number;
    units: Units;
    className?: string;
}

export default function FeelsLikeTemperature({ feelsLike, units, className }: FeelsLikeTemperatureProps) {
    const roundedFeelsLike = Math.round(feelsLike);
    const unitSymbol = units === "imperial" ? "°F" : "°C";

    return (
        <span className={`text-sm italic ${className}`} data-testid="feels-like">
            feels like {roundedFeelsLike}{unitSymbol}
        </span>
    );
}
