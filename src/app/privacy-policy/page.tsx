import { ContentLayout } from "@/components/admin-panel/content-layout";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <ContentLayout title="Privacy Policy">
      <div className="flex flex-col gap-4 md:w-3/6">
        <div className="flex items-center gap-2">
          <Image
            src="/favicon-32x32.png"
            alt="WikiSubmission"
            className="rounded-full"
            width={32}
            height={32}
          />
          <h1 className="text-2xl font-bold">Privacy Policy</h1>
        </div>
        <section>
          <p>
            WikiSubmission takes your privacy seriously. To better protect your privacy we provide
            this privacy policy notice explaining the way your personal information is collected and
            used.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Collection of Routine Information</h2>
          <p>
            This website and our services track basic information about their users. This
            information includes, but is not limited to, IP addresses, browser or app details,
            timestamps and referring pages. None of this information can personally identify
            specific user to this website and our services. The information is tracked for routine
            administration and maintenance purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Cookies</h2>
          <p>
            Where necessary, this website and our services uses cookies to store information about a
            visitor&apos;s preferences and history in order to better serve the user and/or present
            the user with customized content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Advertisement and Other Third Parties</h2>
          <p>
            Advertising partners and other third parties may use cookies, scripts and/or web beacons
            to track user activities on this website and our services in order to display
            advertisements and other useful information. Such tracking is done directly by the third
            parties through their own servers and is subject to their own privacy policies. This
            website and our services has no access or control over these cookies, scripts and/or web
            beacons that may be used by third parties. Learn how to{" "}
            <a
              href="http://www.google.com/privacy_ads.html"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              opt out of Google&apos;s cookie usage
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Links to Third Party Websites</h2>
          <p>
            We have included links on this website and our services for your use and reference. We
            are not responsible for the privacy policies on these websites. You should be aware that
            the privacy policies of these websites may differ from our own.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Security</h2>
          <p>
            The security of your personal information is important to we, but remember that no
            method of transmission over the Internet, or method of electronic storage, is 100%
            secure. While we strive to use commercially acceptable means to protect your personal
            information, we cannot guarantee its absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Changes To This Privacy Policy</h2>
          <p>
            This Privacy Policy is effective as of July 28, 2024 and will remain in effect except
            with respect to any changes in its provisions in the future, which will be in effect
            immediately after being posted on this page.
          </p>
          <p>
            We reserve the right to update or change our Privacy Policy at any time and you should
            check this Privacy Policy periodically. If we make any material changes to this Privacy
            Policy, we will notify you either through the email address you have provided we, or by
            placing a prominent notice on our website and our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Contact Information</h2>
          <p>
            For any questions or concerns regarding the privacy policy, please send we an email to{" "}
            <a href="mailto:contact@wikisubmission.org" className="text-blue-600 hover:underline">
              contact@wikisubmission.org
            </a>
            .
          </p>
        </section>
      </div>
    </ContentLayout>
  );
}
