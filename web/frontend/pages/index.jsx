import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

// import { trophyImage } from "../assets";

// import { ProductsCard } from "../components";
// import DiscountCodes from "../components/Discount/DiscountCodes";
import DiscountOrders from "../components/Discount/DiscountOrders";
import Status from "../components/Discount/Status";
import Counters from "../components/Discount/Counters";

export default function HomePage() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
        <Status/>
        <Counters/>
        
          <Card sectioned>
          <DiscountOrders />
          </Card>
        </Layout.Section>
      
      </Layout>
    </Page>
  );
}
