import AboutSection3 from "@/component/about/AboutSection3";
import ActivitySection2 from "@/component/activity/ActivitySection2";
import BlogSection from "@/component/blog/BlogSection";
import BreadcrumbSection from "@/component/breadcrumb/BreadcrumbSection";
import CourseSection from "@/component/course/CourseSection";
import FaqSection from "@/component/faq/FaqSection";
import Layout from "@/component/layout/Layout";
import WorkSection from "@/component/work/WorkSection";
import PopularServiceSection2 from "@/component/service/PopularServiceSection2";
// import { Navbar } from "react-bootstrap";
import Navbar from "@/component/Navbar2/Navbar";
export const metadata = {
  title: 'About Page',
  description: 'Developed',
}
export default function About() {
    return (
        <Layout>
            {/* <Navbar/> */}
            <BreadcrumbSection header="About us" title="About us"/>
            <section className="tf__about_us_page xs_mt_100">
                {/* <AboutSection3 style=''/> */}
                <WorkSection/>
                <PopularServiceSection2/>
                
                <CourseSection style="tf__popular_courses"/>
                
                {/* <FaqSection img="images/faq_img_2.jpg"/> */}
                {/* <ActivitySection2 style="tf__activities_slider_area pt_95 pb_100"/> */}
                {/* <BlogSection/> */}
                
            </section>
        </Layout>
    )
}