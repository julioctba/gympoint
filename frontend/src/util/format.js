import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatDate(date) {
  return format(parseISO(date), "d 'de' MMMM 'de' yyyy", {
    locale: pt,
  });
}

export function simpleFormatDate(date) {
  return format(date, 'MM-dd-yyyy', {
    locale: pt,
  });
}

export function yearSimpleFormatDate(date) {
  return format(date, 'yyyy-MM-dd', {
    locale: pt,
  });
}

export function advencedFormatDate(date) {
  return format(date, "d 'de' MMMM 'de' yyyy", {
    locale: pt,
  });
}

export function parseDate(date) {
  return parseISO(date);
}

export function invertFormatDate(date) {
  return format(parseISO(date), "d 'de' MMMM 'de' yyyy", {
    locale: pt,
  });
}
