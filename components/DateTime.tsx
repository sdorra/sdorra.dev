import { format, parseISO } from "date-fns";

type Props = {
  value: string;
  title?: string;
  className?: string;
};

const DateTime = ({ title, value, className }: Props) => (
  <time title={title} className={className} dateTime={value}>
    {format(parseISO(value), "yyyy-MM-dd")}
  </time>
);

export default DateTime;
