import Link from 'next/link';

export async function getStaticProps() {
    return { props: {} };
}

export default function PrivacyPolicy() {
    return (
        <div className="container mt-5 mb-5 text-white">
            <h1 className="text-center">Privacy Policy for Coinz</h1>

            <p>One of our main priorities is the privacy of our users. This privacy policy (&quot;Privacy Policy&quot;) explains how we collect, use, and share information when you access or use our Discord bot or website. By accessing or using Coinz, you agree to the collection, use, and sharing of your information as described in this Privacy Policy.</p>

            <h4>I. Information We Collect</h4>
            <p>We collect information you provide directly to us when you access or use Coinz. This includes:</p>
            <ul>
                <li>Your Discord ID</li>
                <li>Your Stripe customer ID if you purchase Premium features or lootboxes on our website</li>
            </ul>

            <h4>II. How We Use Your Information</h4>
            <p>We use the information we collect to provide, maintain, and improve Coinz. This includes:</p>
            <ul>
                <li>Processing payments for Premium features or lootboxes</li>
                <li>Customizing your experience on Coinz</li>
                <li>Analyzing and improving the performance of Coinz</li>
            </ul>

            <h4>III. Legal Basis for Processing</h4>
            <p>We process your personal information in accordance with the General Data Protection Regulation (GDPR). Our legal basis for processing your personal information is as follows:</p>
            <ul>
                <li>Performance of a contract: We process your personal information to provide Coinz to you and fulfill our contractual obligations to you.</li>
                <li>Legitimate interests: We process your personal information for our legitimate interests in operating and improving Coinz.</li>
                <li>Consent: We may ask for your consent to process certain personal information, such as marketing communications.</li>
            </ul>

            <h4>IV. Sharing Your Information</h4>
            <p>We do not sell or rent your information to third parties. We may share your information with third parties in the following circumstances:</p>
            <ul>
                <li>With service providers who assist us in providing Coinz</li>
                <li>To comply with legal obligations, such as responding to a subpoena or court order</li>
                <li>To protect the rights, property, or safety of Coinz, our users, or the public</li>
            </ul>

            <h4>V. Data Retention</h4>
            <p>We retain the information we collect for as long as it is necessary to provide Coinz and to comply with legal obligations.</p>

            <h4>VI. Your Rights</h4>
            <p>Under the GDPR, you have the following rights regarding your personal information:</p>

            <ul>
                <li>Right of access: You have the right to request access to your personal information and any information we hold about you.</li>
                <li>Right to rectification: You have the right to request that we correct any inaccurate personal information we hold about you.</li>
                <li>Right to erasure: You have the right to request that we delete your personal information.</li>
                <li>Right to restrict processing: You have the right to request that we restrict the processing of your personal information.</li>
                <li>Right to object: You have the right to object to the processing of your personal information.</li>
                <li>Right to data portability: You have the right to request that we transfer your personal information to another organization.</li>
            </ul>
            <p>You may exercise these rights by contacting us in our <Link href="/discord" className='text-primary'>Discord Server</Link>.</p>

            <h4>VII. Your Choices</h4>
            <p>You have the following choices regarding the information we collect and how we use it:</p>

            <ul>
                <li>You may opt out of marketing communications from Coinz by following the unsubscribe instructions in the communication</li>
                <li>You may access, modify, or delete your personal information by contacting us in our <Link href="/discord" className='text-primary'>Discord Server</Link></li>
            </ul>

            <h4>VIII. Children&apos;s Privacy</h4>
            <p>Coinz is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will delete it as soon as possible.</p>

            <h4>IX. Changes to This Privacy Policy</h4>
            <p>We may update this Privacy Policy from time to time. We will post any changes on this page and encourage you to review this Privacy Policy regularly. Your continued access or use of Coinz constitutes your acceptance of any changes to this Privacy Policy.</p>

            <h4>X. Cookies</h4>
            <p>We use cookies and similar technologies, such as web beacons, to collect and use information when you access or use Coinz. Cookies are small data files that are stored on your device and used to track your activity on the internet.</p>
            <p>We use cookies to:</p>
            <ul>
                <li>Personalize your experience on Coinz</li>
                <li>Analyze and improve the performance of Coinz</li>
                <li>Remember your preferences</li>
            </ul>

            <p>You can control the use of cookies by adjusting your browser settings. Please note that disabling cookies may affect your ability to use certain features of Coinz.</p>
            <p>By accessing or using Coinz, you consent to the use of cookies as described in this Privacy Policy.</p>

            <h4>XI. Third Party Privacy Policies</h4>

            <p>The Privacy Policy of Coinz does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain
                options. </p>

            <p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&apos; respective websites.</p>

            <h4>XII. Consent</h4>
            <p>By using our website and discord bot, you hereby consent to our Privacy Policy and agree to its terms.</p>

            <h4>XIII. Contact Us</h4>
            <p>If you have any questions or concerns about our collection, use, or sharing of your information, please contact us in our <Link href="/discord" className='text-primary'>Discord Server</Link>.</p>
        </div >
    );
}
