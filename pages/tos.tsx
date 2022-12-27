import Link from 'next/link';

export async function getStaticProps() {
    return { props: {} }
}

function TermsOfService() {
    return (
        <div className="container mt-5 mb-5 text-white">
            <h1 className="text-center">Website Terms and Conditions of Use</h1>

            <h3>1. Terms</h3>

            <p>By accessing this Website, accessible from the <Link href="/" className='text-white text-decoration-none'>coinzbot website</Link>, you
                are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the
                agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from
                accessing this site. The materials contained in this Website are protected by copyright and trade mark law.</p>

            <h3>2. Use License</h3>

            <p>Permission is granted to temporarily download one copy of the materials on Coinz&apos;s Website for personal,
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this
                license you may not:</p>

            <ul>
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose or for any public display;</li>
                <li>attempt to reverse engineer any software contained on Coinz&apos;s Website;</li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transferring the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
            </ul>

            <p>This will let Coinz to terminate upon violations of any of these restrictions. Upon termination, your viewing
                right will also be terminated and you should destroy any downloaded materials in your possession whether it is
                printed or electronic format.</p>

            <h3>3. Disclaimer</h3>

            <p>All the materials on Coinz&apos;s Website are provided &quot;as is&quot;. Coinz makes no warranties, may it be expressed or
                implied, therefore negates all other warranties. Furthermore, Coinz does not make any representations concerning
                the accuracy or reliability of the use of the materials on its
                Website
                or otherwise relating to such materials or any sites linked to this Website.</p>

            <h3>4. Limitations</h3>

            <p>Coinz or its suppliers will not be hold accountable for any damages that will arise with the use or inability to
                use the materials on Coinz&apos;s Website, even if Coinz or an authorize representative of this Website has been
                notified, orally or written, of the possibility of such damage. Some
                jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental
                damages, these limitations may not apply to you.</p>

            <h3>5. Revisions and Errata</h3>

            <p>The materials appearing on Coinz&apos;s Website may include technical, typographical, or photographic errors. Coinz
                will not promise that any of the materials in this Website are accurate, complete, or current. Coinz may change
                the materials contained on its Website at any time without notice.
                Coinz does not make any commitment to update the materials.</p>

            <h3>6. Links</h3>

            <p>Coinz has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such
                linked site. The presence of any link does not imply endorsement by Coinz of the site. The use of any linked
                website is at the user&apos;s own risk.</p>

            <h3>7. Site Terms of Use Modifications</h3>

            <p>Coinz may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you
                are agreeing to be bound by the current version of these Terms and Conditions of Use.</p>

            <h3>8. Your Privacy</h3>

            <p>Please read our <Link href="/privacy" className='text-white text-decoration-none'>Privacy Policy</Link>.</p>

            <h3>9. Governing Law</h3>

            <p>Any claim related to Coinz&apos;s Website shall be governed by the laws of be without regards to its conflict of law
                provisions.</p>
        </div >
    )
}

export default TermsOfService