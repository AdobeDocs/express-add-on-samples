## About

This project has been created with _@adobe/create-ccweb-add-on_. As an example, this Add-on demonstrates how to get started with Add-on development using React and JavaScript.

This addon is a sample on how add-on developers can utilize the hash of the user ID to integrate their add-on with licensing and payment services, enabling them to monetize their add-on effectively. For the purpose of this proof of concept (POC), we will utilize Keygen for the licensing service, Stripe for the payment service, and Zapier to automate the workflows involved in payment processing and license creation.

## Tools

-   HTML
-   JavaScript
-   CSS
-   React
-   Spectrum Web Components

## Setup

1. To install the dependencies, run `npm install`.
2. To build the application, run `npm run build`.
3. To start the application, run `npm run start`.

## Keygen setup

To begin, you must sign up for a new account on Keygen.
Next, you need to create a new product by accessing the following link: https://app.keygen.sh/products/new.
You should create a new license policy for the product. This can be done by visiting: https://app.keygen.sh/policies/new. For this POC, we will make use of following three configurations:

-   Duration: This determines the expiration period of licenses created using this policy. For more detailed information, please refer to: https://keygen.sh/docs/api/policies/#policies-object-attrs-duration.

-   Max Uses: This specifies the maximum number of times a license implementing the policy can be used. For further details, please consult: https://keygen.sh/docs/api/policies/#policies-object-attrs-maxUses.

-   Authentication Strategy: The strategy used for authenticating as a license, for client-side integrations. We will use License key as authentication strategy for our license policy. For further details, please consult: https://keygen.sh/docs/api/policies/#policies-object-attrs-authenticationStrategy

Finally, the developer needs to generate a product token for their specific product. This can be accomplished by utilizing the following link: https://app.keygen.sh/tokens/product/new.

## Stripe Setup

To get started Stripe, you must sign up for a Stripe account.
Following that, you should add a new product to your Stripe account by accessing the link: https://dashboard.stripe.com/products/create.
Next, the developer needs to create payment links for their product, which can be done through the following link: https://dashboard.stripe.com/payment-links/create.
For the purpose of this POC, we will generate three payment links:

-   License Creation Payment Link: This payment link is used to receive payment for license creation.
-   Reset Usage Payment Link: This payment link is used to receive payment for resetting usages for a license if the user has reached their usage limit.
-   Renew License Payment Link: This payment link is used to receive payment for renewing an expired license.

## Zapier Setup

To begin, you must create a new account on Zapier.
We will utilize Zapier to automate three payment and licensing workflows. Each automated task in Zapier is referred to as a "zap." Hence, we will create the following three zaps:

-   License Creation Zap: This zap automates the workflow of license creation. It listens for the payment checkout session event on the License Creation Payment Link. Upon receiving the checkout event, it creates a new license in Keygen. The checkout session event will contain a client_reference_id, which specifies the client who made the payment. This zap assigns the client_reference_id as the license key when creating a new license.

-   Reset Usages Zap: This zap automates the workflow of resetting license usages. It listens for the payment checkout session event on the Reset Usage Payment Link. Once the checkout event is received, it resets the license usages for the license with the client_reference_id value (received in the checkout session event) as the license key.

-   Renew License Zap: This zap automates the workflow of license renewal. It listens for the payment checkout session event on the Renew License Payment Link. When the checkout event is received, it renews the expired license with the client_reference_id value (received in the checkout session event) as the license key.

## Add-on integration with keygen and stripe

To integrate the add-on with Keygen and Stripe, you will require the user-id hash. We can obtain the user-id hash for the current user by utilizing the userId() API.
License Creation
We can prompt the user to make a payment to use the add-on. If the user proceeds with the payment, we can open the License Creation Payment Link (in a popup or new tab window). To identify which user made the payment, we will include the user-id hash as the client_reference_id query parameter in the payment URL. For example, the payment link will be structured as follows: https://buy.stripe.com/cN24ka3j7b4a9Xy149?client_reference_id=${user-id-hash}.
When the user completes the payment, the License Creation Zap will receive the checkout session event associated with the License Creation Payment Link. As mentioned earlier, the zap will create a new license in Keygen, incorporating the duration, expiration, and authentication strategy specified in the license policy. The zap will retrieve the user-id hash as the client_reference_id value from the checkout session event and assign it as the license key when creating the new license in Keygen.
At this point, we have successfully created a license for the current user, with the license key being the user's user-id hash. This license has a maximum usage limit and an expiration time defined by the license policy.
