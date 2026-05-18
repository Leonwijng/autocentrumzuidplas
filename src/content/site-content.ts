export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Occasions", href: "/occasions" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Contact", href: "/contact" },
];

export const business = {
  name: "Autocentrum Zuidplas",
  phone: "0623687249",
  phoneIntl: "+31623687249",
  whatsapp: "31623687249",
  email: "info@autocentrumzuidplas.nl",
  address: {
    street: "Italiaansezoom 15",
    postcode: "2912 GH",
    city: "Nieuwerkerk aan den IJssel",
    country: "Nederland",
  },
  kvk: "42039293",
  domain: "autocentrumzuidplas.nl",
};

export const reviews = [
  {
    name: "Mark van der Berg",
    location: "Rotterdam",
    rating: 5,
    text: "Prettig contact gehad bij Autocentrum Zuidplas. Eerlijk advies, geen onzin verhalen, en de auto rijdt heerlijk.",
  },
  {
    name: "Sarah Klaassen",
    location: "Capelle aan den IJssel",
    rating: 5,
    text: "Snel via WhatsApp gereageerd, dezelfde dag nog kunnen kijken. Service was top.",
  },
  {
    name: "Pieter Hoffman",
    location: "Gouda",
    rating: 5,
    text: "Lokaal, persoonlijk en eerlijk. Precies waar je een auto van wil kopen.",
  },
  {
    name: "Linda de Vries",
    location: "Nieuwerkerk aan den IJssel",
    rating: 5,
    text: "Auto binnen een week op naam. Duidelijke communicatie en eerlijke prijs.",
  },
];
