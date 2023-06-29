export function maskifyAddress(
  address: string,
  symbolsInStartPart: number,
  symbolsInEndPart: number
) {
  const initialPart = address.substring(0, symbolsInStartPart);
  const finalPart = address.substring(address.length - symbolsInEndPart);
  const ellipsis = "...";

  return initialPart + ellipsis + finalPart;
}
