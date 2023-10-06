## 1. Installation 

TODO 

## 2. Setup 

You need to obtain a YouTube Data API key first. Here's a step-by-step guide on how to obtain a YouTube Data API key from the Google Cloud Console:

### Step 1: Access Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Sign in with your Google account or create a new one if you don't have one.

### Step 2: Create a New Project
1. Click on the "Select a project" drop-down at the top left corner.
2. In the modal that appears, click on the "New Project" button at the top right.
3. Give your project a name and click "Create."

### Step 3: Enable YouTube Data API v3
1. In the left sidebar, click on "Navigation Menu" ( menue icon) > "APIs & Services" > "Dashboard."
2. Click on "+ ENABLE APIS AND SERVICES" at the top center.
3. In the search bar, type "YouTube Data API v3" and click on it.
4. Click on the "Enable" button.

### Step 4: Create Credentials
1. Once the API is enabled, you'll be taken to a page where you can manage it. Click on the "Create Credentials" button at the top center.
2. In the form that appears, select the following:
    - **Which API are you using?**: YouTube Data API v3
    - **Where will you be calling the API from?**: Choose the appropriate option (e.g., Web server, Web client, etc.)
    - **What data will you be accessing?**: Choose the appropriate option (Public data is the most straightforward).
3. Click on the "What credentials do I need?" button.
4. The next screen will provide you with an API key. Copy this key and keep it somewhere safe.

### Step 5: Restrict the API Key (Optional but Recommended)
For added security, you can restrict this API key to be used only by specific IP addresses or services.
1. Go back to the Credentials page by clicking on "Credentials" in the left sidebar under "APIs & Services."
2. Click on the edit icon next to the API key you just created.
3. Under the "Application restrictions" section, you can specify the restrictions you'd like to impose.

That's it! You now have a YouTube Data API v3 key that you can use in your application.

Remember to adhere to YouTube's terms of service and the API's usage limitations when using this key. Would you like to know more about any specific part of this process?

## 3. Usage

TODO 