export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
};

export type Products = Product[];

export async function getAllProducts(): Promise<Products> {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = (await res.json()) as Products;
  return data;
}

export type Params = {
  pid: string;
};

type ProductParams = {
  params: Params;
};

export type ProductsParams = ProductParams[];

export async function getAllProductsId(): Promise<ProductsParams> {
  const res = await getAllProducts();
  return res.map((product) => ({
    params: {
      pid: String(product.id)
    }
  }));
}
async function isInDb(id: string):Promise<Product | undefined>{
  const res = await getAllProducts();
  const result = res.find(product => product.id == +id);
  return result;

}

export async function getProductData(id: string): Promise<Product | null> {


  const test = await isInDb(id);
  console.log(test);
  if (!test)return null  
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = (await res.json()) as Product;
  return data
}
