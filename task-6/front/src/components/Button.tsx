import { ReactNode } from "react";
interface Props {
  children: ReactNode;
  color?: "primary" | "secondary" | "danger";
  onClick: () => void;
}

const Button = ({ children, onClick, color = "primary" }: Props) => {
  return (
    <button className={"btn btn-" + color + " py-0"} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
