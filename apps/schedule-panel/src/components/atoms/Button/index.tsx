import { FC } from "react";

export type ButtonProps = {
  text: string;
};

export const Button: FC<ButtonProps> = (props) => {
  const { text } = props;
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
      {text}
    </button>
  );
};
