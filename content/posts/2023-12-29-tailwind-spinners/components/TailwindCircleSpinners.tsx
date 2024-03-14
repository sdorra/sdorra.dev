export const SimpleDivSpinner = () => (
  <div className="ml-2 h-6 w-6 border-b-2 border-current rounded-full animate-spin" />
);

export const SimpleSvgSpinner = () => (
  <svg className="ml-2 h-6 w-6 animate-spin" viewBox="0 0 100 100">
    <circle fill="none" strokeWidth="10" className="stroke-current opacity-40" cx="50" cy="50" r="40" />
    <circle
      fill="none"
      strokeWidth="10"
      className="stroke-current"
      strokeDasharray="250"
      strokeDashoffset="210"
      cx="50"
      cy="50"
      r="40"
    />
  </svg>
);
