# ⚛️⚡ WhatsApp Floating Button Component for React

## Description

This React component offers an elegant WhatsApp floating button, serving as a bridge to the official WhatsApp application. It simulates a WhatsApp chat interface, allowing users to initiate conversations directly from your website. Upon clicking "submit," users are redirected to WhatsApp with their message pre-filled, ready to continue the conversation. Ideal for enhancing customer support and engagement, this component simplifies the transition from web inquiries to WhatsApp communication using WhatsApp's API.

## Screenshots

The WhatsApp Floating Button Component supports both light and dark modes, ensuring it can integrate seamlessly with your application's theme. Below are the mockups for each mode:

| Light Mode | Dark Mode |
|:----------:|:---------:|
| ![Light Mode](https://github.com/CarlosUlisesOchoa/react-whatsapp-floating-button/assets/26280134/b42b26c4-749c-4948-afe0-2dc8139b739f) | ![Dark Mode](https://github.com/CarlosUlisesOchoa/react-whatsapp-floating-button/assets/26280134/1d4fbafa-0c51-449b-8c60-aeaea45b5ea3) |

Toggle between the modes to provide a consistent user experience regardless of your app's theme.

## Installation

Install the component using your preferred package manager:

### npm

```bash
npm install @carlos8a/react-whatsapp-floating-button
```

### pnpm

```bash
pnpm install @carlos8a/react-whatsapp-floating-button
```

### Yarn

```bash
yarn add @carlos8a/react-whatsapp-floating-button
```

## Usage Example

Below is a basic example demonstrating how to integrate the WhatsApp floating button into your app:

```jsx
import { FloatingWhatsApp } from '@carlos8a/react-whatsapp-floating-button';

const App = () => {
  return (
    <div>
      <FloatingWhatsApp
        phoneNumber='5215540000000' // Required
        accountName='Carlos Ochoa' // Optional
        avatar='/images/avatar.webp' // Optional
        initialMessageByServer='Hi there! How can I assist you?' // Optional
        statusMessage='Available' // Optional
        placeholder='Write here...' // Optional
        allowEsc={true} // Optional
        // Explore all available props below
      />
    </div>
  );
};

export default App;
```

### Available Props

| Prop                      |     Type      | Required | Description                                                                                                              | Default                          |
|---------------------------|:-------------:|:--------:|--------------------------------------------------------------------------------------------------------------------------|----------------------------------|
| `phoneNumber`             |    String     | Yes      | Phone number in [international format](https://faq.whatsapp.com/general/contacts/how-to-add-an-international-phone-number)| `5215540000000`                  |
| `accountName`             |    String     | No       | Account username                                                                                                         | `Account Name`                   |
| `onClick`                 |   Function    | No       | Callback fired on click                                                                                                  | `-`                              |
| `onSubmit`                |   Function    | No       | Callback fired on submit with event and form input value                                                                 | `-`                              |
| `onClose`                 |   Function    | No       | Callback fired on close                                                                                                  | `-`                              |
| `onLoopDone`              |   Function    | No       | Callback called when notification loop is done                                                                           | `-`                              |
| `onNotification`          |   Function    | No       | Callback fired when a notification is triggered                                                                          | `-`                              |
| `avatar`                  |    String     | No       | Path to change user avatar                                                                                               | `UI Face`                        |
| `statusMessage`           |    String     | No       | Text displayed below the account username                                                                                | `Typically replies within 1 hour`|
| `initialMessageByServer`  |    String     | No       | First message visitors receive                                                                                           | `Hello there! How can we help?`  |
| `placeholder`             |    String     | No       | Placeholder text for the input field                                                                                     | `Type a message..`               |
| `messageDelay`            |    Number     | No       | Delay before displaying `initialMessageByServer` (seconds)                                                               | `2`                              |
| `darkMode`                |    Boolean    | No       | Enables dark style                                                                                                       | `false`                          |
| `allowClickAway`          |    Boolean    | No       | Allows chat box to close when clicking outside                                                                           | `false`                          |
| `allowEsc`                |    Boolean    | No       | Allows chat box to close when pressing `Escape` key                                                                      | `false`                          |
| `className`               |    String     | No       | CSS class for the main wrapping `Div`                                                                                    | `floating-whatsapp`              |
| `buttonClassName`         |    String     | No       | CSS class for the button                                                                                                 | `floating-whatsapp-button`       |
| `style`                   | CSSProperties | No       | Inline style for the main wrapping `Div`                                                                                 | `{}`                             |
| `buttonStyle`             | CSSProperties | No       | Inline style for the button                                                                                              | `{}`                             |
| `chatboxHeight`           |    Number     | No       | Chat box height                                                                                                          | `320`                            |
| `chatboxClassName`        |    String     | No       | CSS class for the chat box                                                                                               | `floating-whatsapp-chatbox`      |
| `chatboxStyle`            | CSSProperties | No       | Inline style for the chat box                                                                                            | `{}`                             |
| `notification`            |    Boolean    | No       | Enables notifications (disabled after user opens the chat box)                                                           | `false`                          |
| `notificationDelay`       |    Number     | No       | Delay between notifications (seconds)                                                                                    | `60`                             |
| `notificationLoop`        |    Number     | No       | Number of times notifications loop                                                                                       | `0`                              |
| `notificationStyle`       | CSSProperties | No       | Inline style for notification                                                                                            | `-`                              |
| `notificationClassName`   |    String     | No       | CSS class for notification indicator                                                                                     | `floating-whatsapp-notification` |

### Development and Testing Files

The following files are intended solely for development and testing purposes and do not form part of the component's distribution:

- `<root>/index.html` (used to test the component)
- `<root>/src/**/*` (excluding `<root>/src/lib/**/*` which is the component)
- `<root>/public/` (used to test the component)
- `<root>/preparePublish.js` (prepares the component for npm publishing)

## Building and Testing the Package

**Note**: For anyone that just want to get and use the component, the [Installation](#installation) and [Usage Example](#usage-example) sections have got all you need 👍🏻.

This section is for developers who want to modify the component. Follow the steps outlined below to rebuild and test your changes locally.

### Prerequisites

Make sure you have Node.js (version 18 or higher) installed on your system. This project employs `pnpm` for efficient dependency management. If you don't have `pnpm`, install it with the following command:

```bash
npm install -g pnpm
```

### Setting Up the Development Environment

1. **Clone the Repository**: Get a copy of the project onto your local machine by cloning the GitHub repository.

    ```bash
    git clone https://github.com/CarlosUlisesOchoa/react-whatsapp-floating-button.git
    cd react-whatsapp-floating-button
    ```

2. **Install Dependencies**: Use `pnpm` to install all the necessary dependencies. This ensures your environment is equipped with everything needed for building and testing the component.

    ```bash
    pnpm install
    ```

### Running a Local Development Server

You will be able to modify and see real-time changes due we are using Vite to dev and deploy.

You can run:

```bash
pnpm run dev
```

Now you will be able to start enhancing or customizing this beautiful but always improveable component 😁.

### Rebuilding the Library

Execute the following command to build the library:

```bash
pnpm run build:lib
```

This script performs a series of tasks:

- Clears the `dist` directory for a clean build.
- Adjusts TypeScript configurations for the build.
- Compiles the library using Vite into the `dist` folder, which will contain the production-ready code.
- Resets TypeScript configurations after the build.

That's it. Now you can take a look at the ```dist``` directory where you'll find the bundled code.

## Acknowledgements

- Special thanks to [@awran5](https://github.com/awran5) for the [react-floating-whatsapp](https://github.com/awran5/react-floating-whatsapp) component, which served as a base for this enhanced version.
- Gratitude to [@darwinva97](https://github.com/darwinva97) for the [PR](https://github.com/awran5/react-floating-whatsapp/pull/27) contributing improvements in accessibility and SEO through `aria-hidden` attribute modifications.

### License

[MIT License](LICENSE) © 2024
