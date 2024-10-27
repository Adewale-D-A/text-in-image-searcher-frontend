// import { useCallback } from "react";

import { ReactNode, useCallback } from "react";
import LoaderIcon from "../../assets/icons/loader";

interface Props {
  label: string;
  type: "button" | "submit" | "reset" | undefined;
  isLoading: boolean;
  disabled?: boolean;
  clickHandler?: Function;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export default function LoadingButton({
  label,
  type,
  isLoading,
  disabled,
  clickHandler,
  startIcon,
  endIcon,
}: Props) {
  const handleClick = useCallback(() => {
    if (clickHandler) {
      clickHandler();
    }
  }, [clickHandler]);
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full flex justify-center p-3 px-6 rounded-full transition-all  
        ${
          disabled
            ? "bg-primary/30 text-white"
            : "bg-primary hover:bg-transparent hover:border hover:border-primary  hover:text-primary text-white"
        }`}
      onClick={() => handleClick()}
    >
      {isLoading ? (
        <LoaderIcon className="w-6 h-6 animate-spin" />
      ) : (
        <span className=" flex items-center gap-2 text-nowrap">
          {startIcon} {label} {endIcon}
        </span>
      )}
    </button>
  );
}
