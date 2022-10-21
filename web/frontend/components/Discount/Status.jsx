import { Banner, Button, CalloutCard, List } from "@shopify/polaris"
import '../../Styles/Banner.css';

const Status = () => {

  return (
    <div className="banner">

    <CalloutCard
      title="Spin Wheel App"
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
      primaryAction={{
        content: 'Manage App',
        url: '/admin/themes/121684361345/editor?context=apps',
      }}
    >
      <p>Check weather your app is enable or disable.</p>
    </CalloutCard>
    </div>
  )
}

export default Status