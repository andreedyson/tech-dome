export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
export const LANDING_PAGE_LINKS = [
  { url: "/", title: "Home" },
  { url: "/catalogs", title: "Catalogs" },
  { url: "/brands", title: "Brands" },
  { url: "/categories", title: "Categories" },
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

export const productStatusFilterOptions = [
  {
    value: "PRE_ORDER",
    label: "Pre-Order",
  },
  {
    value: "READY",
    label: "Ready",
  },
];

export const orderStatusFilterOptions = [
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "SUCCESS",
    label: "Success",
  },
];

export const DUMMY_TESTIMONIALS = [
  {
    name: "Caio Henrique",
    date: "Jan 24, 2025",
    review: "I do really love the quality of this product.",
    star: 5,
  },
  {
    name: "Sophia Martinez",
    date: "Feb 10, 2025",
    review: "Absolutely fantastic! Exceeded my expectations.",
    star: 5,
  },
  {
    name: "Liam Johnson",
    date: "Mar 5, 2025",
    review: "Great product! Customer service was also very helpful.",
    star: 4,
  },
  {
    name: "Emma Wilson",
    date: "Apr 15, 2025",
    review: "Very satisfied with my purchase. Will buy again!",
    star: 5,
  },
  {
    name: "Noah Brown",
    date: "May 8, 2025",
    review: "Solid product. Does exactly what it promises.",
    star: 4,
  },
  {
    name: "Olivia Davis",
    date: "Jun 20, 2025",
    review: "Amazing quality! Highly recommend to everyone.",
    star: 5,
  },
];
