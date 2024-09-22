export function replaceAll(str: string, find: string, replace: string): string {
  const escapeRegExp = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return str.replace(new RegExp(escapeRegExp, 'g'), replace); 
}