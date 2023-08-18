export const pencil = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
      className="fill-gray-7"
    ></path>
    <path
      d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
      className="fill-gray-7"
    ></path>
  </svg>,
];

export const heart = (width = 24) => [
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={width}
  >
    <path
      d="M12 21.35L10.55 20.07C4.91 15.36 2 12.27 2 8.5C2 5.42 4.42 3 7.5 3C9.31 3 10.97 3.95 12 5.37C13.03 3.95 14.69 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.27 19.09 15.36 13.45 20.07L12 21.35Z"
      fill="#FF4136"
    />
  </svg>
]

export const outlineHeart = (width = 24) =>
  [<svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={width}
  >
    <path
      d="M12 21.35L10.55 20.07C4.91 15.36 2 12.27 2 8.5C2 5.42 4.42 3 7.5 3C9.31 3 10.97 3.95 12 5.37C13.03 3.95 14.69 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.27 19.09 15.36 13.45 20.07L12 21.35Z"
      stroke="#000"
      strokeWidth="2"
    />
  </svg>]

export const plus = (width = 24) =>
  [<svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={width}
  >
    <path d="M12 5V19" stroke="#000" strokeWidth="2" />
    <path d="M5 12H19" stroke="#000" strokeWidth="2" />
  </svg>]

export const yellowPlus = (width = 24) => [
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={width}
  >
    <path d="M12 5V19" stroke="#FFD700" strokeWidth="2" />
    <path d="M5 12H19" stroke="#FFD700" strokeWidth="2" />
  </svg>
]