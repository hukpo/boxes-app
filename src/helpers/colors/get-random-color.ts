const NO_IMAGE_RANDOM_COLORS: string[] = [
  '#ffa44a',
  '#59b6f0',
  '#61b864',
  '#3ac2cf',
  '#f05959',
  '#de59f0',
  '#5977f0',
];

export const getRandomColor = (): string => {
  return NO_IMAGE_RANDOM_COLORS[Math.floor(Math.random() * NO_IMAGE_RANDOM_COLORS.length)];
};
