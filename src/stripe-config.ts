export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_SmM8XEA5xSqJD5',
    priceId: 'price_1RqnQSR7emstJdgzE2t9Ujgf',
    name: 'VisionSense™',
    description: 'Advanced perception system for autonomous vehicle research with stereo cameras and pre-trained AI models.',
    mode: 'payment'
  }
];

export function getProductById(id: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.id === id);
}

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}