export function getImageUrl(fileName: string) {
  return process.env.NEXT_PUBLIC_CDN_URL + fileName;
}
