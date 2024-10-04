import { IconProps } from "@/types";
import IconWrapper from "./IconWrapper";

export default function ChanceOfRain({ size, color, className = '' }: IconProps) {
    return (
        <IconWrapper size={size} color={color} className={`chance-of-rain-icon ${className}`}>
        <g className="rain-drop">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.99993 1C5.65276 1 5.36339 1.17976 5.16152 1.45177C5.09068 1.5478 4.92673 1.77255 4.709 2.08705C4.41942 2.50534 4.03176 3.08669 3.64247 3.73551C3.25505 4.38123 2.85535 5.11139 2.54959 5.82484C2.25681 6.50802 1.99893 7.24994 2 8.00206C2.00062 8.21313 2.02582 8.42526 2.06046 8.63311C2.11824 8.97986 2.23566 9.45747 2.48051 9.94719C2.72731 10.4408 3.11323 10.9649 3.71085 11.3633C4.31472 11.7659 5.07494 12 5.99994 12C6.92494 12 7.68516 11.7659 8.28904 11.3633C8.88666 10.9649 9.2726 10.4409 9.51942 9.94722C9.76428 9.45751 9.88173 8.9799 9.93952 8.63315C9.9742 8.42505 9.99972 8.21239 10 8.00101C10.0004 7.24888 9.74323 6.50811 9.45038 5.82482C9.14461 5.11137 8.7449 4.38121 8.35746 3.7355C7.96816 3.08668 7.58048 2.50533 7.29089 2.08703C7.07315 1.77254 6.9092 1.54779 6.83835 1.45175C6.63647 1.17975 6.3471 0.999997 5.99993 1ZM7.6121 6.61268C7.35536 6.01363 7.00506 5.36879 6.64248 4.7645C6.42198 4.39701 6.20087 4.05101 5.99996 3.74751C5.79905 4.05101 5.57796 4.397 5.35747 4.76449C4.99491 5.36877 4.64462 6.01361 4.38789 6.61266L4.37335 6.64657C4.19665 7.0585 3.98776 7.54548 4.00018 8.00042C4.01216 8.36034 4.1089 8.73181 4.26939 9.05281C4.39756 9.30917 4.57412 9.53511 4.82025 9.6992C5.06012 9.85912 5.4249 10 5.99994 10C6.57498 10 6.93977 9.85912 7.17966 9.69919C7.42581 9.5351 7.60238 9.30915 7.73057 9.05278C7.89107 8.73179 7.98784 8.3603 7.99982 8.00038C8.01225 7.54551 7.80337 7.05857 7.62668 6.64668L7.6121 6.61268Z" />
        </g>
        <g className="rain-drop">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9999 1C17.6528 1 17.3634 1.17976 17.1615 1.45177C17.0907 1.5478 16.9267 1.77255 16.709 2.08705C16.4194 2.50534 16.0318 3.08669 15.6425 3.73551C15.2551 4.38123 14.8554 5.11139 14.5496 5.82484C14.2568 6.50802 13.9989 7.24994 14 8.00206C14.0006 8.21313 14.0258 8.42526 14.0605 8.63311C14.1182 8.97986 14.2357 9.45747 14.4805 9.94719C14.7273 10.4408 15.1132 10.9649 15.7108 11.3633C16.3147 11.7659 17.0749 12 17.9999 12C18.9249 12 19.6852 11.7659 20.289 11.3633C20.8867 10.9649 21.2726 10.4409 21.5194 9.94722C21.7643 9.45751 21.8817 8.9799 21.9395 8.63315C21.9742 8.42505 21.9997 8.21239 22 8.00101C22.0004 7.24888 21.7432 6.50811 21.4504 5.82482C21.1446 5.11137 20.7449 4.38121 20.3575 3.7355C19.9682 3.08668 19.5805 2.50533 19.2909 2.08703C19.0732 1.77254 18.9092 1.54779 18.8384 1.45175C18.6365 1.17975 18.3471 0.999997 17.9999 1ZM19.6121 6.61268C19.3554 6.01363 19.0051 5.36879 18.6425 4.7645C18.422 4.39701 18.2009 4.05101 18 3.74751C17.7991 4.05101 17.578 4.397 17.3575 4.76449C16.9949 5.36877 16.6446 6.01361 16.3879 6.61266L16.3734 6.64656C16.1967 7.0585 15.9878 7.54548 16.0002 8.00042C16.0122 8.36034 16.1089 8.73181 16.2694 9.05281C16.3976 9.30917 16.5741 9.53511 16.8203 9.6992C17.0601 9.85912 17.4249 10 17.9999 10C18.575 10 18.9398 9.85912 19.1797 9.69919C19.4258 9.5351 19.6024 9.30915 19.7306 9.05278C19.8911 8.73179 19.9878 8.3603 19.9998 8.00038C20.0123 7.54552 19.8034 7.05858 19.6267 6.6467L19.6121 6.61268Z" />
        </g>
        <g className="rain-drop">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1615 12.4518C11.3634 12.1798 11.6528 12 11.9999 12C12.3471 12 12.6365 12.1797 12.8384 12.4518C12.9092 12.5478 13.0732 12.7725 13.2909 13.087C13.5805 13.5053 13.9682 14.0867 14.3575 14.7355C14.7449 15.3812 15.1446 16.1114 15.4504 16.8248C15.7432 17.5081 16.0004 18.2489 16 19.001C15.9997 19.2124 15.9742 19.4251 15.9395 19.6332C15.8817 19.9799 15.7643 20.4575 15.5194 20.9472C15.2726 21.4409 14.8867 21.9649 14.289 22.3633C13.6852 22.7659 12.9249 23 11.9999 23C11.0749 23 10.3147 22.7659 9.71085 22.3633C9.11323 21.9649 8.72731 21.4408 8.48051 20.9472C8.23566 20.4575 8.11824 19.9799 8.06046 19.6331C8.02582 19.4253 8.00062 19.2131 8 19.0021C7.99893 18.2499 8.25681 17.508 8.54959 16.8248C8.85535 16.1114 9.25505 15.3812 9.64247 14.7355C10.0318 14.0867 10.4194 13.5053 10.709 13.087C10.9267 12.7726 11.0907 12.5478 11.1615 12.4518ZM12.6425 15.7645C13.0051 16.3688 13.3554 17.0136 13.6121 17.6127C13.6169 17.624 13.6218 17.6353 13.6267 17.6467C13.8034 18.0586 14.0123 18.5455 13.9998 19.0004C13.9878 19.3603 13.8911 19.7318 13.7306 20.0528C13.6024 20.3091 13.4258 20.5351 13.1797 20.6992C12.9398 20.8591 12.575 21 11.9999 21C11.4249 21 11.0601 20.8591 10.8203 20.6992C10.5741 20.5351 10.3976 20.3092 10.2694 20.0528C10.1089 19.7318 10.0122 19.3603 10.0002 19.0004C9.98776 18.5455 10.1967 18.0585 10.3734 17.6466C10.3782 17.6352 10.3831 17.6239 10.3879 17.6127C10.6446 17.0136 10.9949 16.3688 11.3575 15.7645C11.578 15.397 11.7991 15.051 12 14.7475C12.2009 15.051 12.422 15.397 12.6425 15.7645Z" />
        </g>
      </IconWrapper>)
}