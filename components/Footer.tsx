import { MailIcon, PhoneCallIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import whatsapp from "../public/WhatsAppButtonGreenSmall.svg";
import stripe from "../public/stripe.png";

export default function Footer() {
  return (
    <footer className=" pb-10 md:px-5 md:pb-20">
      <section className="flex flex-row items-center justify-around text-pretty border-y py-10 text-center">
        {/* <div className="">
          <span className="text-sm font-medium md:text-lg">Made in USA</span>
        </div> */}
        <div className="">
          <span className="text-sm font-medium md:text-lg">Free Shipping</span>
        </div>
        <div className=" flex flex-col items-center justify-center">
          <span className="text-sm font-medium md:text-lg">Payments via</span>
          <Image
            loading="lazy"
            className="bg-[#02042b] p-1"
            width={90}
            src={stripe}
            alt="razorpay"
          />
        </div>
      </section>
      <section className="container mx-auto pt-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h2 className="mb-3 text-lg font-bold">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-sm hover:underline"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/return-refund-policy"
                  className="text-sm hover:underline"
                >
                  Return and Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-lg font-bold">Contact Us</h2>
            <div className="mb-3 flex gap-2 text-sm hover:underline">
              <MailIcon size={16} />
              <Link href="mailto:aabiz1997@gmail.com">aabiz1997@gmail.com</Link>
            </div>
            <div className="mb-3 flex gap-2 text-sm hover:underline">
              <PhoneCallIcon size={16} />
              <Link href="tel:10000000000">{`+1 (000) 000-0000`}</Link>
            </div>
            <div className="mb-3 flex gap-2 text-sm hover:underline">
              <PhoneCallIcon size={16} />
              <Link href="tel:9620700000000">{`+962 (07) 00000000`}</Link>
            </div>
            <div className="w-fit">
              <Link
                href={"https://wa.me/10000000000"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  loading="lazy"
                  className="rounded-lg border border-black/20"
                  width={140}
                  src={whatsapp}
                  alt="whatsapp"
                />
              </Link>
            </div>
            <div className="mt-2 flex space-x-4">
              <Link
                href="https://www.facebook.com/ali.alhaddad.75457"
                className="text-sm hover:underline"
              >
                Facebook
              </Link>
              <Link
                href="https://www.linkedin.com/in/ali-alhaddad/"
                className="text-sm hover:underline"
              >
                Linkedin
              </Link>
              <Link
                href="https://www.instagram.com/alooshie_97"
                className="text-sm hover:underline"
              >
                Instagram
              </Link>
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold">Ali Alhaddad</h2>
            <a
              href="https://maps.app.goo.gl/8szwGWdEmrRAktQDA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm hover:underline"
            >
              In between Florida and Jordan
            </a>
          </div>
        </div>
      </section>
      <p className="mt-10 text-center text-sm">
        © {new Date().getFullYear()} brought to you by Ali Alhaddad
      </p>
    </footer>
  );
}
