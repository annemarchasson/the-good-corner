import CategoryBar from "./layput-elements/CategoriesBar";
import Footer from "./layput-elements/Footer";
import Topbar from "./layput-elements/topbar/Topbar";

function Layout1({ children }: { children: JSX.Element }) {
    return (
      <div>
       <Topbar />
       <CategoryBar />
       {children}
       <Footer />
      </div>
    );
  }
  
  export default Layout1;
  