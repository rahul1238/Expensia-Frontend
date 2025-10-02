import Heading from "../components/ui/Heading";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";

export default function PrivacyPolicy() {

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Section>
          <Card className="p-8">
            <Heading level={1} className="text-3xl mb-6 text-gray-900 dark:text-white">
              Privacy Policy
            </Heading>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              <strong>Last updated:</strong> September 30, 2025
            </p>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                1. Introduction
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Welcome to Expensia ("we," "our," or "us"). This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our expense management application 
                and related services (the "Service").
              </p>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                We are committed to protecting your privacy and ensuring the security of your personal information. 
                By using our Service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                2. Information We Collect
              </Heading>
              
              <Heading level={3} className="text-lg mb-3 text-gray-800 dark:text-gray-200">
                2.1 Personal Information
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                When you create an account, we may collect:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>Name and email address</li>
                <li>Profile information</li>
                <li>Account preferences and settings</li>
              </ul>

              <Heading level={3} className="text-lg mb-3 text-gray-800 dark:text-gray-200">
                2.2 Gmail Integration Data
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                With your explicit consent, we request permission to access your Gmail account using Google's OAuth2 system. 
                We specifically request the following scope:
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-4">
                <p className="text-blue-800 dark:text-blue-200 font-semibold mb-2">
                  OAuth Scope: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-sm">https://www.googleapis.com/auth/gmail.readonly</code>
                </p>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  This is a <strong>read-only</strong> permission that allows us to view (but not modify, delete, or send) your Gmail messages.
                </p>
              </div>

              <p className="mb-3 text-gray-700 dark:text-gray-300">
                <strong>How we use this scope:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li><strong>Read transaction emails:</strong> Access emails from banks, payment providers, and merchants containing purchase receipts, transaction confirmations, and expense-related information</li>
                <li><strong>Extract financial data:</strong> Parse email content to identify amounts, dates, merchant names, and transaction categories</li>
                <li><strong>Automated expense tracking:</strong> Convert email-based transaction data into organized expense records in your dashboard</li>
                <li><strong>AI-powered categorization:</strong> Use machine learning to automatically categorize and tag your transactions</li>
              </ul>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-4">
                <p className="text-green-800 dark:text-green-200 font-semibold mb-2">
                  🔒 Privacy Protection
                </p>
                <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
                  <li>• <strong>Read-only access:</strong> We cannot send, modify, or delete your emails</li>
                  <li>• <strong>Selective processing:</strong> We only analyze emails that contain financial/transaction keywords</li>
                  <li>• <strong>No personal emails:</strong> Personal correspondence, non-financial emails are ignored</li>
                  <li>• <strong>Revocable access:</strong> You can revoke our Gmail access at any time through your Google Account settings</li>
                  <li>• <strong>Secure processing:</strong> Email data is processed securely and not stored permanently on our servers</li>
                </ul>
              </div>

              <Heading level={3} className="text-lg mb-3 text-gray-800 dark:text-gray-200">
                2.3 Usage Data
              </Heading>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>Application usage patterns</li>
                <li>Feature interactions and preferences</li>
                <li>Error logs and performance data</li>
                <li>Device and browser information</li>
              </ul>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                3. How We Use Your Information
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                We use the collected information for:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>Providing and maintaining our expense management services</li>
                <li>Processing and categorizing your financial transactions</li>
                <li>Generating expense reports and analytics</li>
                <li>Improving our AI-powered categorization algorithms</li>
                <li>Sending service-related notifications</li>
                <li>Providing customer support</li>
                <li>Detecting and preventing fraud or unauthorized access</li>
              </ul>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                4. Data Sharing and Disclosure
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                We do not sell, trade, or rent your personal information to third parties. We may share 
                your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li><strong>Service Providers:</strong> With trusted third-party services that help us operate our application (e.g., cloud hosting, analytics)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and users</li>
                <li><strong>Business Transfer:</strong> In the event of a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share specific information</li>
              </ul>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                5. Data Security
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                We implement appropriate technical and organizational security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>Encryption in transit and at rest</li>
                <li>Secure authentication and authorization</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal data on a need-to-know basis</li>
                <li>Secure cloud infrastructure with industry-standard protections</li>
              </ul>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                6. Your Rights and Choices
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong>Withdrawal:</strong> Revoke Gmail access permissions at any time</li>
                <li><strong>Opt-out:</strong> Unsubscribe from non-essential communications</li>
              </ul>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                To exercise these rights, please contact us at <a href="mailto:expensia-management@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">expensia-management@gmail.com</a>.
              </p>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                7. Data Retention
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                We retain your personal information for as long as necessary to provide our services and 
                fulfill the purposes outlined in this Privacy Policy. Specifically:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>Account information: Until you delete your account</li>
                <li>Transaction data: For the duration of your account plus 7 years for financial record-keeping</li>
                <li>Usage data: Up to 2 years for analytics and service improvement</li>
                <li>Support communications: Up to 3 years after resolution</li>
              </ul>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                8. Third-Party Services
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Our Service integrates with third-party services:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li><strong>Google Services:</strong> For Gmail integration and authentication (governed by Google's Privacy Policy)</li>
                <li><strong>AI Services:</strong> For transaction categorization and analysis</li>
                <li><strong>Cloud Providers:</strong> For hosting and data storage</li>
              </ul>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                These services have their own privacy policies, and we encourage you to review them.
              </p>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                9. International Data Transfers
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your data in accordance with 
                applicable data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                10. Children's Privacy
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Our Service is not intended for children under 13 years of age. We do not knowingly 
                collect personal information from children under 13. If you are a parent or guardian 
                and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                11. Changes to This Privacy Policy
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                For significant changes, we may provide additional notice through email or application notifications.
              </p>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                12. Contact Us
              </Heading>
                            <p className="mb-4 text-gray-700 dark:text-gray-300">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> <a href="mailto:expensia-management@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">expensia-management@gmail.com</a><br/>
                  <strong>Company:</strong> Expensia<br/>
                  <strong>Address:</strong> [Your Business Address]
                </p>
              </div>
            </section>

            <div className="border-t border-gray-200 dark:border-gray-600 pt-6 mt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This Privacy Policy is effective as of September 30, 2025, and applies to all users of the Expensia application.
              </p>
            </div>
          </div>
          </Card>
        </Section>
      </div>
    </div>
  );
}