import { Grid, GridItem } from "@chakra-ui/react";
import { Sidebar } from "./sidebar";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Grid
        minH="100vh"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
      >
        <GridItem rowSpan={2} colSpan={1}>
          <Sidebar />
        </GridItem>
        <GridItem rowSpan={2} colSpan={4}>
          {children}
        </GridItem>
      </Grid>
    </>
  );
}
