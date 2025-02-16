import ProductDetailsBreadcrumb from "@/components/catalogs/ProductDetailsBreadcrumb";
import ProductDetailsImages from "@/components/catalogs/ProductDetailsImages";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProductById } from "@/lib/data/product";
import { currencyFormatterIDR } from "@/lib/utils";
import { MapPin, ShoppingCart, Star } from "lucide-react";
import { redirect } from "next/navigation";

async function ProductDetailsPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const product = await getProductById(id);

  if (!product) {
    redirect("/catalogs");
  }

  return (
    <section className="mt-8 w-full space-y-8">
      <ProductDetailsBreadcrumb
        product={{
          id: product.id,
          name: product.name,
        }}
      />

      {/* Product */}
      <div className="flex gap-12">
        {/* Product Images */}
        <ProductDetailsImages product={product} />
        {/* Product Details */}
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold md:text-5xl">{product.name}</h1>
              <div>
                <p className="mt-2 font-semibold text-muted-foreground">
                  {product.categoryName} • {product.brandName}
                </p>
              </div>
            </div>
            <div>
              <p className="flex items-center gap-1">
                <MapPin size={16} />
                {product.locationName}
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} fill="orange" stroke="orange" size={22} />
              ))}
            </div>
            <span className="font-semibold">({product.total_sales})</span>
          </div>

          <Separator className="my-4 h-[2px]" />

          <div>
            <h3 className="text-lg font-semibold">About Products</h3>
            <p className="text-justify">{product.description}</p>
          </div>

          <Separator className="my-4 h-[2px]" />

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold md:text-3xl">
              {currencyFormatterIDR(product.price)}
            </h2>
            <Button>
              <ShoppingCart strokeWidth={3} />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
