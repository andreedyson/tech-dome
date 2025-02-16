import ProductDetailsBreadcrumb from "@/components/catalogs/ProductDetailsBreadcrumb";
import ProductDetailsImages from "@/components/catalogs/ProductDetailsImages";
import ShowMoreText from "@/components/ShowMoreText";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProductById, getTopProducts } from "@/lib/data/product";
import { getImageUrl } from "@/lib/supabase";
import { currencyFormatterIDR } from "@/lib/utils";
import { MapPin, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

async function ProductDetailsPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const product = await getProductById(id);
  const topProducts = await getTopProducts();
  const filteredProducts = topProducts.filter(
    (topProduct) => topProduct.name !== product?.name,
  );

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
      <div className="flex flex-col gap-12 xl:flex-row">
        <ProductDetailsImages product={product} />
        {/* Product Details */}
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold md:text-5xl">{product.name}</h1>
              <div>
                <p className="mt-1 text-sm font-semibold text-muted-foreground md:mt-2 md:text-base">
                  {product.categoryName} • {product.brandName}
                </p>
              </div>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm md:text-base">
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

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">About Products</h3>
            <ShowMoreText
              className="text-justify"
              text={product.description}
              maxLength={300}
            />
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

      <div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Testimonials</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 4 }, (_, index) => (
              <article
                key={index}
                className="flex flex-col gap-4 rounded-lg border-2 p-6"
              >
                <div className="flex items-center gap-2">
                  <div>
                    <Image
                      src={"/assets/image-placeholder.svg"}
                      width={60}
                      height={60}
                      alt="User"
                      className="rounded-full"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-bold">Caio Henrique</p>
                    <p className="text-sm">Jan 12, 2025</p>
                  </div>
                </div>

                <div className="mt-2 space-y-3">
                  <p className="text-justify leading-none">
                    I do really love the quality of this product
                  </p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} fill="orange" stroke="orange" size={16} />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Products You Might Like Section */}
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold md:text-3xl">
            Products You Might Like
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
          {filteredProducts.map((product) => (
            <div key={product.id} className="rounded-xl border-2 shadow-md">
              <Image
                src={getImageUrl(product.images[0], "products")}
                width={150}
                height={150}
                alt={product.name}
                className="w-full object-contain"
              />
              <div className="p-4">
                <h4 className="line-clamp-1 text-lg font-bold md:text-xl">
                  {product.name}
                </h4>
                <p className="text-sm font-medium text-muted-foreground">
                  {product.category.name}
                </p>
                <p className="mt-2 text-base font-bold text-main-violet-700 md:mt-3 md:text-lg">
                  {currencyFormatterIDR(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
