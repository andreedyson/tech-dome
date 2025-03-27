import AddToCartButton from "@/components/AddToCartButton";
import HorizontalProductCard from "@/components/card/HorizontalProductCard";
import ProductDetailsBreadcrumb from "@/components/catalogs/ProductDetailsBreadcrumb";
import ProductDetailsImages from "@/components/catalogs/ProductDetailsImages";
import ShowMoreText from "@/components/ShowMoreText";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DUMMY_TESTIMONIALS } from "@/constants";
import { getUser } from "@/lib/auth";
import { getProductById, getSimilarProducts } from "@/lib/data/product";
import { convertRupiah } from "@/lib/utils";
import { ChevronLeft, Home, MapPin, Star } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Fetch Product Data
  const product = await getProductById(id);

  return {
    title: product
      ? `${product?.name} - ${product?.category?.name}`
      : "Product Not Found",
    description: product?.description || "",
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

  if (!product) {
    return (
      <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-2 text-center">
        <Image
          src={"/assets/empty-details.svg"}
          width={500}
          height={300}
          alt="Products Not Found"
          className="aspect-video size-full lg:size-[380px]"
          priority
        />
        <div className="space-y-0.5">
          <h4 className="text-sm font-semibold md:text-base">
            Oops! Product Not Found.
          </h4>
          <p className="max-w-md text-sm md:text-base">
            The item you're looking for might be out of stock or no longer
            available.
          </p>
        </div>
        <div className="mt-6 flex flex-col items-center gap-4 md:flex-row">
          <Link href={"/catalogs"}>
            <Button className="flex w-[180px] items-center gap-2">
              <ChevronLeft />
              Continue Shopping
            </Button>
          </Link>
          <Link href={"/"}>
            <Button
              variant={"outline"}
              className="flex w-[180px] items-center gap-2"
            >
              <Home />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const similarProducts = await getSimilarProducts(
    product.category?.id as number,
  );
  const filteredSimilarProducts = similarProducts.filter(
    (similar) => similar.name !== product?.name,
  );

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
              <h1
                title={product.name}
                className="line-clamp-2 max-w-sm text-3xl font-bold md:text-5xl"
              >
                {product.name}
              </h1>
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
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} fill="orange" stroke="orange" size={22} />
                ))}
              </div>
              <span className="font-semibold">({product.total_sales})</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground md:text-base">
              {product.stock} Items Left
            </p>
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
              stock={product.stock}
            />
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Testimonials</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {DUMMY_TESTIMONIALS.map((testi, index) => (
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
                    <p className="text-base font-bold">{testi.name}</p>
                    <p className="text-sm">{testi.date}</p>
                  </div>
                </div>

                <div className="mt-2 space-y-3">
                  <p className="leading-none">{testi.review}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testi.star }, (_, i) => (
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
              .map((product) => (
                <HorizontalProductCard key={product.id} product={product} />
              ))
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
