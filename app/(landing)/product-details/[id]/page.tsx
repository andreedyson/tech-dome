import AddToCartButton from "@/components/AddToCartButton";
import HorizontalProductCard from "@/components/card/HorizontalProductCard";
import ProductDetailsBreadcrumb from "@/components/catalogs/ProductDetailsBreadcrumb";
import ProductDetailsImages from "@/components/catalogs/ProductDetailsImages";
import ShowMoreText from "@/components/ShowMoreText";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/lib/auth";
import { getProductById, getSimilarProducts } from "@/lib/data/product";
import { getImageUrl } from "@/lib/supabase";
import { convertRupiah } from "@/lib/utils";
import { MapPin, Star } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Fetch Product Data
  const product = await getProductById(id);

  return {
    title: `${product?.name} - ${product?.category?.name}`,
    description: product?.description,
  };
}

async function ProductDetailsPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const { session } = await getUser();
  const product = await getProductById(id);
  const similarProducts = await getSimilarProducts(
    product?.category?.id as number,
  );
  const filteredSimilarProducts = similarProducts?.filter(
    (similar) => similar.name !== product?.name,
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
                  {product.category?.name} • {product.brand?.name}
                </p>
              </div>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm md:text-base">
                <MapPin size={16} />
                {product.location?.name}
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
              {convertRupiah(product.price)}
            </h2>
            <AddToCartButton
              product={product}
              isLoggedIn={session ? true : false}
            />
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
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

      {/* Similar Products Section */}
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold md:text-3xl">Similar Products</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredSimilarProducts.length > 0 ? (
            filteredSimilarProducts
              .slice(0, 4)
              .map((product) => <HorizontalProductCard product={product} />)
          ) : (
            <div className="col-span-full flex flex-col items-center gap-2 text-center">
              <Image
                src={"/assets/empty-products.svg"}
                width={500}
                height={300}
                alt="Products Not Found"
                className="aspect-video size-[180px] lg:size-[280px]"
                priority
              />
              <div className="space-y-0.5">
                <h4 className="text-sm font-semibold md:text-base">
                  No Similar Products found.
                </h4>
                <p className="max-w-[350px] text-xs md:text-sm">
                  Showing list of similar products with the category of{" "}
                  {product.category?.name}.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
