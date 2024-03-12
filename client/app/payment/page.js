import Layout from "@/component/layout/Layout"
import Phonepe from "@/component/payment/phonepe"
export const metadata = {
    title: 'Weavecu Payment Page',
    description: 'Developed',
  }
  export default function Contact() {
      return (
          <Layout>
              <Phonepe/>
         </Layout>
      )
  }