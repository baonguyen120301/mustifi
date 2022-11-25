import NavBar from "./NavBar";
import Footer from "./Footer";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: "#11284b",
    backgroundImage:
      "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 80%)",
  },
  body: {
    minHeight: "47vh",
  },
}));
type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <NavBar
        links={[
          {
            link: "/",
            label: "Home",
          },
          {
            link: "/",
            label: "Event",
            links: [
              {
                link: "/home/1",
                label: "Sale",
              },
              {
                link: "/home/2",
                label: "Community",
              },
            ],
          },
        ]}
      />
      <div className={classes.body}>{children}</div>
      <Footer data={[]} />
    </div>
  );
}
