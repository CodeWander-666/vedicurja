interface ServiceDetailHeroProps {
  slug: string;
}

export function ServiceDetailHero({ slug }: ServiceDetailHeroProps) {
  return <div>Service Detail Hero: {slug}</div>;
}
