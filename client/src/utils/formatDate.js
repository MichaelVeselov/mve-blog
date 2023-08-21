const locale = navigator.language;

const dateOptions = {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

export const creationDate = Intl.DateTimeFormat(locale, dateOptions);
