import { Cart } from "./mongodb";

export function appURL() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  } else {
    const url = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return url;
  }
}

export function getShopifyCheckoutUrl(
  shopUrl: string,
  cart: Cart | null,
  refFid: string,
) {
  let cartUrl = `${shopUrl}/cart/`;
  cart?.products.map((product) => {
    cartUrl += `${product.variant.id.replace("gid://shopify/ProductVariant/", "")}:${product.quantity},`;
  });
  cartUrl += `?ref=fc:fid_${refFid}`;
  return cartUrl;
}

export function createWarpcastIntent(frameUrl: string): string {
  const sharableText = `Hello farcaster, checkout my products from the /shopycast frame 🚀`;
  const sharableTextUriEncoded = encodeURI(sharableText);
  return `https://warpcast.com/~/compose?text=${sharableTextUriEncoded}&embeds%5B%5D=${frameUrl}`;
}
