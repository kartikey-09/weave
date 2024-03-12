import Sidebar from "@/component/admin/sidebar/sidebar"
import Welcome from "@/component/admin/welcome/welcome"
export const metadata = {
    title: 'Weavecu admin Dashboard',
    description: 'Developed',
  }
  export default function AdminDashboard() {
      return (
          <div>
            <Sidebar/>
      </div>
      
      
      )
  }