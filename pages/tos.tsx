import Link from 'next/link';

export async function getStaticProps() {
    return { props: {} };
}

function TermsOfService() {
    return (
        <div className="container mt-5 mb-5 text-white">
            <h1 className="text-center">Coinz Terms and Conditions</h1>

            <p>Coinz is a Discord bot and website that allows users to engage in virtual economic and gambling activities using virtual currency. While all gambling activities on Coinz are for entertainment purposes only and do not involve the use of real money, users may purchase premium features and lootboxes on the Coinz website using real money.</p>

            <p>By accessing or using the Coinz bot or website, you agree to be bound by the following terms of service. If you do not agree to these terms, you are not permitted to use Coinz.</p>

            <h4>I. Age Restriction</h4>
            <p>You must be at least 13 years old to use Coinz. By accessing or using Coinz, you confirm that you are at least 13 years old.</p>

            <h4>II. Virtual Currency</h4>
            <p>Coinz uses a virtual currency, known as &quot;coins&quot;, for all economic and gambling activities on the platform. Coins have no real-world value and cannot be exchanged for real money or any other form of currency.</p>

            <h4>III. Premium Features</h4>
            <p>Coinz offers premium features that can be purchased on the website using real money. These premium features are subject to change and may be discontinued at any time. Coinz is not responsible for any losses or damages resulting from the discontinuation of premium features.</p>

            <h4>IV. Lootboxes</h4>
            <p>Coinz also offers lootboxes that can be purchased on the website using real money. Lootboxes contain a random selection of virtual items, and the contents of each lootbox are unknown until it is opened. Coinz is not responsible for any dissatisfaction with the contents of a lootbox.</p>

            <h4>V. Account Termination</h4>
            <p>Coinz reserves the right to terminate any account at any time for any reason, including, but not limited to, violation of these terms of service or any applicable laws. If your account is terminated, you may lose access to any virtual currency or items you have acquired on Coinz.</p>

            <h4>VI. Errors</h4>
            <p>Coinz may contain errors, such as typos, technical errors, or other inaccuracies. Coinz is not responsible for any errors or omissions, and we reserve the right to correct any errors or inaccuracies at any time.</p>

            <h4>VII. Warranty Disclaimer</h4>
            <p>Coinz is provided &quot;as is&quot;, without warranty of any kind. Coinz makes no warranties, express or implied, regarding the accuracy, completeness, reliability, or suitability of the bot or website. Coinz is not responsible for any actions taken based on the information provided on the bot or website.</p>

            <h4>VIII. Limitation of Liability</h4>
            <p>In no event will Coinz be liable for any damages, including, but not limited to, direct, indirect, special, incidental, or consequential damages, arising out of the use or inability to use the bot or website, even if Coinz has been advised of the possibility of such damages.</p>

            <h4>IX. Governing Law</h4>
            <p>These terms of service shall be governed by and construed in accordance with the laws of the United States.</p>

            <h4>X. Changes to These Terms</h4>
            <p>Coinz reserves the right to change these terms of service at any time. Any changes will be effective immediately upon posting on the Coinz website. By continuing to access or use Coinz after any changes have been made, you agree to be bound by the revised terms of service.</p>

            <h4>XI. Privacy Policy</h4>
            <p>By accessing or using Coinz, you agree to the collection, use, and sharing of your personal information as described in the Coinz privacy policy, which can be found at our <Link href="/privacy" className='text-primary'>Privacy Policy</Link>.</p>
        </div>
    );
}

export default TermsOfService;