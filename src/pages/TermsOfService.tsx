import Heading from "../components/ui/Heading";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Section>
          <Card className="p-8">
            <Heading level={1} className="text-3xl mb-6 text-gray-900 dark:text-white">
              Terms of Service
            </Heading>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              <strong>Last updated:</strong> September 30, 2025
            </p>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                1. Acceptance of Terms
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                By accessing and using Expensia ("the Service"), you accept and agree to be bound by the 
                terms and provision of this agreement. If you do not agree to abide by the above, please 
                do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                2. Description of Service
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Expensia is an AI-powered expense management application that helps users track, categorize, 
                and analyze their financial transactions through Gmail integration and automated processing.
              </p>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                3. User Accounts and Responsibilities
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and complete information</li>
                <li>Complying with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                4. Acceptable Use
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>Use the Service for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Upload malicious code or content</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                5. Privacy and Data Protection
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Your privacy is important to us. Please review our Privacy Policy, which also governs 
                your use of the Service, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                6. Limitation of Liability
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                The Service is provided "as is" without warranty of any kind. We shall not be liable 
                for any indirect, incidental, special, consequential, or punitive damages.
              </p>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                7. Termination
              </Heading>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                We may terminate or suspend your account immediately, without prior notice or liability, 
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section className="mb-8">
              <Heading level={2} className="text-xl mb-4 text-gray-900 dark:text-white">
                8. Contact Information
              </Heading>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> <a href="mailto:expensia-management@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">expensia-management@gmail.com</a><br/>
                  <strong>Support:</strong> <a href="mailto:expensia-management@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">expensia-management@gmail.com</a>
                </p>
              </div>
            </section>
          </div>
          </Card>
        </Section>
      </div>
    </div>
  );
}