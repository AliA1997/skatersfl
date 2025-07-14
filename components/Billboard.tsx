"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import SaleBanner from "../public/banner/Sale-Banner.svg";
import Banner from "../public/banner/Banner.svg";
import { AspectRatio } from "./ui/aspect-ratio";

export default function Billboard() {
  return (
    <div className="flex-1 py-4">
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem>
            <AspectRatio ratio={2 / 1}>
              <Image
                className="w-full rounded-lg"
                src={Banner}
                alt=""
                priority
                width={1920}
                height={860}
              />
            </AspectRatio>
          </CarouselItem>
          <CarouselItem>
            <AspectRatio ratio={2 / 1}>
              <Image
                className="w-full rounded-lg"
                src={SaleBanner}
                alt="Customize your with your own design and preference."
                width={1920}
                height={860}
                priority
              />
            </AspectRatio>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
