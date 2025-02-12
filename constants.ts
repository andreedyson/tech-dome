export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
export const LANDING_PAGE_LINKS = [
  { url: "/", title: "Home" },
  { url: "/categories", title: "Categories" },
  { url: "/testimonials", title: "Testimonials" },
  { url: "/rewards", title: "Rewards" },
];
export const LANDING_TESTIMONIALS = [
  {
    name: "Matthew Marley",
    comment: "Money saver!",
    image: "/assets/landing-customer-1.png",
  },
  {
    name: "Anthony Newman",
    comment: "Best quality product!",
    image: "/assets/landing-customer-2.png",
  },
  {
    name: "Emily Lee",
    comment: "Best deals",
    image: "/assets/landing-customer-3.png",
  },
  {
    name: "Arnash Priven",
    comment: "Fast delivery",
    image: "/assets/landing-customer-4.png",
  },
];
