import { ContentLayout } from "@/components/admin-panel/content-layout";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Identity } from "@/constants/identity";

export default function ContactPage() {
  return (
    <ContentLayout title="Contact Us">
      <div className="flex flex-col gap-6 md:w-3/6">
        <div className="flex items-center gap-2">
          <Image
            src="/favicon-32x32.png"
            alt="WikiSubmission"
            className="rounded-full"
            width={32}
            height={32}
          />
          <h1 className="text-2xl font-bold">Contact Us</h1>
        </div>

        <section>
          <p className="text-muted-foreground">
            We&apos;d love to hear from you. Whether you have questions about WikiSubmission, 
            suggestions for improvements, or need technical support, we&apos;re here to help.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Get in touch with us through these channels.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Email</h4>
              <p className="text-sm text-muted-foreground mb-2">
                For general inquiries, support, or feedback:
              </p>
              <a 
                href={`mailto:${Identity.email}`}
                className="text-primary hover:underline font-medium"
              >
                {Identity.email}
              </a>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">GitHub</h4>
              <p className="text-sm text-muted-foreground mb-2">
                For bug reports, feature requests, or contributing to the project:
              </p>
              <a 
                href={Identity.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                {Identity.social.github.replace('https://', '')}
              </a>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Support Guidelines</h4>
              <p className="text-sm text-muted-foreground">
                For technical issues, please include as much detail as possible 
                about your problem, including browser version and any error messages.
              </p>
            </div>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-xl font-bold mb-2">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold">Is WikiSubmission free to use?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, WikiSubmission is completely free and open-source. 
                We believe in providing free access to The Final Testament.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">How can I contribute to the project?</h3>
              <p className="text-sm text-muted-foreground">
                We welcome contributions! Visit our{" "}
                <a 
                  href={Identity.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub repository
                </a>{" "}
                to see open issues, submit pull requests, or suggest new features. You can also join our{" "}
                <a 
                  href={Identity.developerDiscord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Discord server
                </a>{" "}
                to interact with the developers and other contributors.
              </p>
            </div>
          </div>
        </section>
      </div>
    </ContentLayout>
  );
}
