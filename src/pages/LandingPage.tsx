import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router";

const LandingPage = () => {
  //* for url --->
  const [longUrl, setLongUrl] = useState<string>();

  //* for auth login button -->
  const navigate = useNavigate();

  //* short the url -->
  const handleSort = (e: React.MouseEvent) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };
  return (
    <div className="flex flex-col gap-10 items-center h-screen">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-5xl lg:text-6xl text-center text-black dark:text-white font-extrabold">
        {" "}
        The only URL Shortner
        <br /> you&rsquo;ll ever need!
      </h2>

      <form className="sm:h-12 flex flex-col sm:flex-row w-rull md:w-2/4 gap-2">
        <Input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter your link here"
          className="h-full"
        />
        <Button className="h-full" onClick={handleSort}>
          Shorten!
        </Button>
      </form>

      <Accordion type="multiple" className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How does the Trimrr URL shortener works?
          </AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generates a shorter version of
            that URL. This shortened URL redirects to the original long URL when
            accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Do I need an account to use the app?
          </AccordionTrigger>
          <AccordionContent>
            Yes. Creating an account allows you to manage your URLs, view
            analytics, and customize your short URLs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            What analytics are available for my shortened URLs?
          </AccordionTrigger>
          <AccordionContent>
            You can view the number of clicks, geolocation data of the clicks
            and device types (mobile/desktop) for each of your shortened URLs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;
