<img width="150" height="150" style="float: left; margin: 0 10px 10px 0;" alt="Coinz" src="https://cdn.coinzbot.xyz/logo.png">

# Coinz App
![Framework](https://img.shields.io/badge/Framework-Next.js-000000?style=for-the-badge&logo=next.js)
[![Website](https://img.shields.io/badge/Website-Coinz-007ACC?style=for-the-badge&logo=vercel&logoColor=white)](https://coinzbot.xyz)
[![Discord](https://img.shields.io/discord/938177962698735616?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/asnZQwc6kW)

Coinz App is a website built with Next.js 13 made for the [Coinz Discord bot](https://github.com/SiebeBaree/Coinz).

## Pages
* Landing page with animations and statistics.
* FAQ page with 12 questions and answers.
* Commands page with all commands and their usage.
* Items page with all shop items and their description dynamically fetched from the database.
* Status page with the status of the bot and all its clusters and shards. Dynamically fetched.
* Updates page with all Coinz updates.
* Donate page
* Terms of use page
* Privacy policy page

## Suggestions, bugs, feature requests
Want to contribute? Great, we love that! Please take your time on [opening a new issue](https://github.com/YourUsername/coinz-app/issues/new).

## Support Coinz
Coinz has started as a passion project but has developed way further than I ever imagined. To support this rappid growth please consider [donating](https://coinzbot.xyz/donate).

If you can't/don't want to donate anything, that's fine. You can also support Coinz by starring this repository. To make this bot even better consider opening a pull request or issue with a new feature.

## Running the project locally

### Prerequisites:
* Node.js
* MongoDB database

### Steps to run the project:

1. Clone the project:
    ```bash
    git clone https://github.com/SiebeBaree/coinz-app.git
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a .env file with the following content:
    ```env
    DATABASE_URI=your-mongodb-uri
    ```

4. Run the project:
   ```bash
   npm run dev
   ```

Please note that the author, `siebe_b` on Discord, will **NOT** provide assistance in understanding or implementing the source code. It is your responsibility to understand and adapt the code as needed for your own project.

## License
We use the GNU GPLv3-license. If you plan to use any part of this source code in your own bot, we would be grateful if you would include some form of credit somewhere.

> You may copy, distribute and modify the software as long as you track changes/dates in source files. Any modifications to or software including (via compiler) GPL-licensed code must also be made available under the GPL along with build & install instructions.

Fetched from [TLDRLegal](https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)), please also read the [license](https://github.com/SiebeBaree/coinz-app/blob/main/LICENSE) if you plan on using the source code. This is only a short summary. Please also take note of that we are not forced to help you, and we won't help you host it yourself as we do not recommend you doing so.