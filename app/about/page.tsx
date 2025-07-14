import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function About() {
  return (
    <section className="px-2 py-4">
      <h2 className="p-4 text-3xl font-medium">About Us</h2>
      <ul className="flex list-inside list-disc flex-col gap-2">
        <li>
          Established in 1990, skatersfl has been a cornerstone in the
          skateboarding community, providing quality products and services to skaters.
        </li>
        <li>
          Located in the heart of Florida's skate scene, our journey began with a passion for skateboarding and a commitment to serving the local skate community.
        </li>
        <li>
          At skatersfl, we take pride in our extensive range of
          skateboard products, including decks, trucks, wheels, bearings, and
          accessories. Our commitment to quality and performance sets us apart in the industry.
        </li>
        <li>
          Each product we carry is carefully selected to meet the highest standards
          of durability, functionality, and style for skaters of all levels.
        </li>
        <li>
          With years of experience and expertise, we have cultivated strong
          relationships with our customers, from beginners to professional skaters.
        </li>
        <li>
          We understand the unique needs of skaters, which is why we
          offer team discounts and wholesale options for skate shops and teams looking
          for quality gear.
        </li>
        <li>
          Our dedication to the skate community drives us to continuously
          bring in the best products and provide excellent service.
        </li>
        <li>
          Whether you're a beginner looking for your first board or a seasoned skater in need of pro gear, skatersfl is your
          reliable skate shop every step of the way.
        </li>
        <li>
          As a proud member of the skate community, we are committed to supporting local skateparks, events, and initiatives. We strive to give back to the sport that has given us so much.
        </li>
      </ul>
    </section>
  );
}
