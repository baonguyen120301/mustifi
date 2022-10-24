import NavBar from "./NavBar";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode,
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <NavBar links={[{
        link: "/",
        label: "Home",
      },
      {
        link: "/home",
        label: "Event",
        links: [{
          link: "/home/1",
          label: "Sale"
        },{
          link: "/home/2",
          label: "Community"
        }]
      }
    ]} />
      {children}
      <Footer data={[]}/>
    </div>
  );
}
