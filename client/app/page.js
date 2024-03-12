import AboutSection from "@/component/about/AboutSection";
import ActivitySection from "@/component/activity/ActivitySection";
import BannerSection from "@/component/banner/BannerSection";
import BlogSection from "@/component/blog/BlogSection";
import CategorySection from "@/component/category/CategorySection";
import EventSection from "@/component/event/EventSection";
import FaqSection from "@/component/faq/FaqSection";
import FooterSection from "@/component/footer/FooterSection";
import VideoModal from "@/component/modal/VideoModal";
import NavbarSection from "@/component/navbar/NavbarSection";
import TestimonialSection from "@/component/testimonial/TestimonialSection2";
import ScrollToTopButton from "@/component/utils/ScrollToTopButton";
import VideoSection from "@/component/video/VideoSection";
import WorkSection from "@/component/work/WorkSection";
import ActivitySection2 from "@/component/activity/ActivitySection2";
import Accrediations from "@/component/Accrediations/accrediations"
import UpperNavbar from "@/component/uppernavbar/uppernavbar";
import "../public/css/globals.css"
import Navbar from "@/component/Navbar2/Navbar";


export const metadata = {

  title: "Weavecu Home Page ",

  title: "Weavecu Home Page ",

  description: "Developed ",
};

export default function Home() {
  return (
    
      <>
      <UpperNavbar/>
      {/* <NavbarSection style="" logo="images/logo.png" /> */}
      <Navbar class1="" topDistance="" logo="images/logo.png" />
      
      <BannerSection />
  <div>

      <Accrediations/>
  </div>
  <div>
      <CategorySection />
  </div>
      
      {/* <AboutSection /> */}
      {/* <EventSection section="tf__event mt_95" startIndex={0} endIndex={4} /> */}
      {/* <FaqSection img="images/ldka.jpg" /> */}
      {/* <WorkSection /> */}
      {/* <ActivitySection2 style="tf__activities_slider_area pt_95 pb_100"/> */}
      <ActivitySection2 style="tf__activities_slider_area"/>
      <TestimonialSection />
      {/* <ActivitySection /> */}
      {/* <VideoSection /> */}
      <BlogSection />
      <FooterSection />
      <VideoModal />
      <ScrollToTopButton style="" />
      </>
  );
}
